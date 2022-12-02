import { userModel, userSchema } from "../DB/models/user.model.js"
import { productModel } from "../DB/models/product.model.js"
import { myEmail } from "../services/sendEmail.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { checkprofile } from "../services/checkProfile.js"


export const Admin=async()=>{
   
    const user= new userModel({firstName:"Admin",Role:"admin"})
    const savedUser=await user.save()
    const adminToken=jwt.sign({id:user._id,isLoggedIn: true },'admin token')
    console.log({adminToken});
}
export const getUserById=async(req,res)=>{
   
    const user=await userModel.findById(req.params.id)
    
    res.status(200).json({ message: "done",user })
    
 }


export const updateProfile=async(req,res)=>{
    
    const{firstName,lastname}=req.body
    const updatedUser=await userModel.findByIdAndUpdate(req.user._id,{firstName},{new:true})
    res.status(200).json({ message: "done", updatedUser })
}


export const softDeleteProfile=async(req,res)=>{
   const user=await userModel.findById(req.user._id)
   console.log(req.user._id);
   if(user.isDeleteted==false){
      const deletedUser=await userModel.findByIdAndUpdate(req.user._id,{isDeleteted:true},{new:true})
      
      res.status(200).json({ message: "done", deletedUser })
   }else{
      res.status(400).json({ message: "user is already soft deleted" })
   }
  
}

export const updatePassword = async (req, res) => {
 
    const { oldPassword, newPassword } = req.body
    const user = await userModel.findById(req.user._id)
    const match = await bcrypt.compare(oldPassword, user.password)
    
    if (!match) {
        res.status(400).json({ message: "In-valid Password" })
    } else {
        const hashPassword = await bcrypt.hash(newPassword, parseInt(process.env.saltRound))
        await  userModel.findOneAndUpdate({_id:user._id} , {password:hashPassword});
        res.status(200).json({message:"Done"})
    }
}

export const signOut=async(req,res)=>{
    

    const user=await userModel.findByIdAndUpdate(req.user._id,{isOnline:false,lastSeen:Date.now()},{new:true})  
        
    res.status(200).json({message:"suceefully signout",lastseen:user.lastSeen})
}

export const blockAccount=async(req,res)=>{
    const {admintoken}=req.headers
    const decoded=jwt.verify(admintoken,'admin token')
    
    if (decoded&&decoded.id){
        const user=await userModel.updateOne({_id:req.params.id},{isBlocked :true},{new:true})  
        res.status(200).json({message:"suceefully blocked",user})
    }

   
}

export const getAllUsersWithProductsWithComments=async(req,res)=>{
    //const user = await userModel.findById(req.user._id)
   
    const products=await productModel.find({isDeleteted:false}).populate([
        {
            path: "createdBy",
            //select: "_id email firstName"
        },{
            path: "comments",
            select: "commentBody"
        },

    ])
    res.status(200).json({ message: "Done", products })
}

