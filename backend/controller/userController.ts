import {Request, Response} from 'express'
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import cloudinary from '../utils/cloudinary';
import { generaVerficationCode } from '../utils/generateVerificationCdde';
import { generatedToken } from '../utils/generateToken';
import { sendPasswordRestEmail, sendResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from '../mailtrap/email';


export const signup = async (req:Request, res:Response): Promise< void> => {

  try {

    const {fullname, email, password, contact} = req.body;
     let user = await User.findOne({email});
     if(user) {
      res.status(400).json({
        success:false,
        message:"User already exist with this email"
      })
     }
     // passowrd method added here
     const hashedPassword = await bcrypt.hash(password, 10);
     const verificationToken = generaVerficationCode()

    user = await User.create({
      fullname,
      email,
      password:hashedPassword,
      contact:Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now()+24*60*60*1000,
    })
    generatedToken(res, user);
    
    await sendVerificationEmail(email, verificationToken)

    const userWithoutPassword = await User.findOne({email}).select("-passowrd")

   res.status(201).json({
      success:true,
      message:"Account created successfully",
      user:userWithoutPassword,
    })
    
  } catch (error) {
    console.log(error);
     res.status(500).json({message:"signUp Error"})
  }
}


export const login = async (req:Request, res:Response) : Promise <void> => {
  try {

    const {email, passowrd} = req.body;

    const user = await User.findOne({email});
    if(!user) {
     res.status(400).json({
        success:false, message:"Incorrect email"
      });
      return;
    }
    
    const isPasswordMatch = await bcrypt.compare(passowrd, user.password);
    if(!isPasswordMatch) {
       res.status(400).json({
        success:false,
        message:"Incorrect passowrd"
      })
    }
    generatedToken(res, user)


    user.lastLogin = new Date();
    await user.save();

    // send user without password
    const userWithoutPassword = await User.findOne({email}).select("-passowrd")

     res.status(200).json({
      success:true,
      message:`Welcome back ${user.fullname}`,
      user:userWithoutPassword
    })

  } catch (error) {
    console.log(error);
     res.status(500).json({message: "Login server Error"})
  }
}

export const verifyEamil = async (req:Request, res:Response) : Promise <void> => {
  try {
    
    const {verificationCode} = req.body;
  
    const user = await User.findOne({verificationToken : verificationCode, verificationTokenExpiresAt: {$gt : Date.now()}}).select("-password");

    if(!user) {
       res.status(400).json({
        success:false, message:"Invalid or expired verification token"
      })
      return;
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcone eamil 
    // awaite sendEmail
    await sendWelcomeEmail(user.email, user.fullname)

     res.status(200).json({
      success:true,
      messsage:"Eamil verified successfully",
      user,
    })

  } catch (error) {
    console.log(error);
   res.status(500).json({message: "Internal server error"})
  }
}


export const logout = async (req:Request, res:Response) : Promise <void> => {
  try {
    
     res.clearCookie("token").status(200).json({
      success:true,
      message:"Logged out successfully"
    })


  } catch (error) {
    console.log(error);
     res.status(500).json({message:"logout server error"})
  }
}


export const forgetPassword = async (req:Request, res:Response) : Promise<void> => {
  try {
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user) {
     res.status(400).json({
        success:false,
        message:"User doesn't exist"
      })
      return
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpirestAt = new Date(Date.now()+1*60*60*1000)

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpirestAt;

    await user.save();

    // send email 
    // await sendPasswordRestEmail(user:email, `${process.env.}/resetpassword/${token}`)
    await sendPasswordRestEmail(user.email, `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`)

   res.status(200).json({
      success:false,
      message:"password reset link sent to your email",
      resetToken
    })

  } catch (error) {
    console.log(error);
     res.status(500).json({
      success: false,
      message:"forgetPassword server Error"
    })
  }
}

export const resetPassword = async(req:Request, res:Response) : Promise<void> => {
  try {
    
    const {token} = req.params;
    const {newPassword} = req.body;
    const user = await User.findOne({resetPasswordToken:token, resetPasswordTokenExpiresAt:{$gt:Date.now()}})

    if(!user) {
       res.status(400).json({
        success:false,
        message:"Invalid or expired verification token"
      })

      return
    }
    //update password
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // send success reset email
    // await sendResetemail
    await sendResetSuccessEmail(user.email)

     res.status(200).json({
      success:true,
      message:"Password reset successfully"
    })

  } catch (error) {
    console.log(error);
     res.status(500).json({message:"Internal server error"})
  }
}


export const checkAuth = async (req:Request, res:Response) : Promise <void> => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if(!user) {
      res.status(404).json({
        success:false,
        message:"User not found"
      })
      return
    }
    res.status(200).json({
      success:true,
      user
    })
    
  } catch (error) {
    console.log(error)
     res.status(500).json({message: "checkAuth server error"})
  }
}


export const updatedProfile = async (req:Request, res:Response) : Promise <void> => {
  try {
    
    const userId = req.id;
    const {fullname, email, address, city, country , profilePicture} = req.body;

    // upload image on cloudinary
    let cloudResponse : any;
    
    cloudResponse= await cloudinary.uploader.upload(profilePicture);

    const updatedData = {fullname, email, address, city, country , profilePicture};

    const user = await User.findByIdAndUpdate(userId, updatedData, {new: true}).select("-passowrd")

     res.status(200).json({
      success:true,
      user,
      message:"Profile updated successfully"
    })

  } catch (error) {
    console.log(error);
     res.status(500).json({message:"UpdatedProfile server error"})
  }
}