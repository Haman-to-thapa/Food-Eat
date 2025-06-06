import {Request, Response} from 'express'
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs'
import crypto from 'crypto'


export const signup = async (req:Request, res:Response) => {

  try {

    const {fullname, email, password, contact} = req.body;
     let user = await User.findOne({email});
     if(user) {
      return res.status(400).json({
        success:false,
        message:"User already exist with this email"
      })
     }
     // passowrd method added here
     const hashedPassword = await bcrypt.hash(password, 10);
     const verificationToken = "skvijfafafkjafjfas"

    user = await User.create({
      fullname,
      email,
      password:hashedPassword,
      contact:Number(contact),
      verificationToken,
      verificationTokenExpiresAt: Date.now()+24*60*60*1000,
    })

    // generatedToken

    // await sendVerificationEmai()

    const userWithoutPassword = await User.findOne({email}).select("-passowrd")

    return res.status(201).json({
      success:true,
      message:"Account created successfully",
      user:userWithoutPassword,
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"signUp Error"})
  }
}


export const login = async (req:Request, res:Response) => {
  try {

    const {email, passowrd} = req.body;

    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        success:false, message:"Incorrect email"
      });
    }
    
    const isPasswordMatch = await bcrypt.compare(passowrd, user.password);
    if(!isPasswordMatch) {
      return res.status(400).json({
        success:false,
        message:"Incorrect passowrd"
      })
    }


    user.lastLogin = new Date();
    await user.save();

    // send user without password
    const userWithoutPassword = await User.findOne({email}).select("-passowrd")

    return res.status(200).json({
      success:true,
      message:`Welcome back ${user.fullname}`,
      user:userWithoutPassword
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Login server Error"})
  }
}

export const verifyEamil = async (req:Request, res:Response) => {
  try {
    
    const {verificationCode} = req.body;
  
    const user = await User.findOne({verificationToken : verificationCode, verificationTokenExpiresAt: {$gt : Date.now()}}).select("-password");

    if(!user) {
      return res.status(400).json({
        success:false, message:"Invalid or expired verification token"
      })
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcone eamil 
    // awaite sendEmail

    return res.status(200).json({
      success:true,
      messsage:"Eamil verified successfully",
      user,
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({message: "Internal server error"})
  }
}


export const logout = async (req:Request, res:Response) => {
  try {
    
    return res.clearCookie("token").status(200).json({
      success:true,
      message:"Logged out successfully"
    })


  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"logout server error"})
  }
}


export const forgetPassword = async (req:Request, res:Response) => {
  try {
    const {email} = req.body;

    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({
        success:false,
        message:"User doesn't exist"
      })
    }

    const resetToken = crypto.randomBytes(40).toString("hex");
    const resetTokenExpirestAt = new Date(Date.now()+1*60*60*1000)

    user.resetPasswordToken = resetToken;
    user.resetPasswordTokenExpiresAt = resetTokenExpirestAt;

    await user.save();

    // send email 
    // await sendPasswordRestEmail(user:email, `${process.env.}/resetpassword/${token}`)

    return res.status(200).json({
      success:false,
      message:"password reset link sent to your email",
      resetToken
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message:"forgetPassword server Error"
    })
  }
}

export const resetPassword = async(req:Request, res:Response) => {
  try {
    
    const {token} = req.params;
    const {newPassword} = req.body;
    const user = await User.findOne({resetPasswordToken:token, resetPasswordTokenExpiresAt:{$gt:Date.now()}})

    if(!user) {
      return res.status(400).json({
        success:false,
        message:"Invalid or expired verification token"
      })
    }
    //update password
    const hashedPassword = await bcrypt.hash(newPassword,10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    // send success reset email
    // await sendResetemail

    return res.status(200).json({
      success:true,
      message:"Password reset successfully"
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Internal server error"})
  }
}