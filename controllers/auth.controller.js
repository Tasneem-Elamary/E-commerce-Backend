import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { userModel } from "../DB/models/user.model.js"
import { myEmail } from '../services/sendEmail.js'

var tokens=[]


export const signup=async(req,res)=>{
    try {
    const{firstName,lastName,email,password,cPassword,age,phone}=req.body
    const user=await userModel.findOne({email})
    if(user){
        res.status(400).json({message:"email already exist"})
    }
    else{
        const hashpassword=await bcrypt.hash(password, 8)
       
        const newUser = new userModel({ email, password: hashpassword, firstName,lastName ,phone,age})
        const savedUser = await newUser.save()
        console.log(savedUser.phone);
        const token=jwt.sign({id:savedUser._id},'emailToken')
        const link=`${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
        const message=`<a href=${link}>follow link to activate</a>`
        myEmail(savedUser.email, message)
        res.status(201).json({message:"done",savedUser})
    }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}


export const confirmEmail=async(req,res)=>{
    try {
    const {token}=req.params
    const decoded=jwt.verify(token,'emailToken')
    if(decoded&&decoded.id){
        const user=await userModel.findById(decoded.id)
        if(user){
            if(user.confirmEmail==false){
                const confirmUser=await userModel.updateOne({_id:user._id},{confirmEmail:true},{new:true})
                res.status(200).json({message:"please logIn"})
            }else{res.status(400).json({message:"email already confirmed!!"})}
            
        }else{res.status(400).json({message:"invalid account"})}
    }else{
        res.status(400).json({message:"invalid token email"})
    }
        
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}

export const signIn=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await userModel.findOne({email})
        if((!user)||user.isDeleteted|| user.isBlocked){
            res.status(400).json({message:"invalid  account"})
        }else{
            if(user.confirmEmail==true){
                const match = await bcrypt.compare(password, user.password)
                if(!match){
                    res.status(400).json({message:" password is incorrect"})
                }else{
                    const acesstoken=jwt.sign({id:user._id,isLoggedIn: true },'access token', { expiresIn:"1h" })
                    const refreshtoken=jwt.sign({id:user._id,isLoggedIn: true },'refresh token')
                
                    res.status(200).json({message:" done",acesstoken,refreshtoken,user})
                }
            }else{
                res.status(400).json({message:" please confirm your email first"})
            }
       
    }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }
    
}

export const sendEmailforgetPassword=async(req,res)=>{
    const { email } = req.body
    const user = await userModel.findOne({ email }).select('userName email')
    if (!user) {
        res.status(400).json({ message: "Not register account" })
    } else {
    const token=jwt.sign({id:user._id},'passwordToken')
    const link=`${req.protocol}://${req.headers.host}/api/v1/user/resetpassword/${token}`
    const message=`<a href=${link}>follow link to reset password</a>`
    myEmail(email, message)
    res.status(200).json({message:"done",token})
 }}


 export const forgetPassword=async(req,res)=>{
    const {token}=req.params
    const{password,cpassword}=req.body
    tokens.push(token)
    if (tokens.length>1){
        res.status(400).json({message:"invalid route"})
    }else{
     const decoded=jwt.verify(token,'passwordToken')
     if(decoded&&decoded.id){
       const hashpassword=await bcrypt.hash(password, 8)
       const user = await userModel.updateOne({ _id: decoded.id },
          { password: hashpassword }, { new: true })
    
          res.status(200).json({message:"Password successfully reset",user})
       }else{
          res.status(500).json({message:"invalid token"})
       }
    }}

