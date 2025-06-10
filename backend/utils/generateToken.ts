import jwt from 'jsonwebtoken'
import {Response} from 'express'


export const generatedToken = (res:Response, user:any) => {
  try {
    
    const token = jwt.sign({userid: user._id}, process.env.SECRET_KEY!, {expiresIn: "1d"});

    res.cookie("token", token, {httpOnly:true, sameSite:"strict", maxAge:24*60*60*1000});

    return token

  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"generatedToken server error"})
  }
}