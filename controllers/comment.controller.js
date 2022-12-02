import { commentModel } from "../DB/models/comment.model.js"
import { productModel } from "../DB/models/product.model.js"
import { userModel } from "../DB/models/user.model.js"

export const addcomment=async(req,res)=>{
    const{commentBody}=req.body
    const{productId}=req.params
    const product=await productModel.findById(productId)
    
    if((!product)||product.isDeleteted){
        res.status(400).json({message:" product Not found"})
    }else{
        const user=await userModel.findById(req.user._id)
        if((!user)||user.isDeleteted||user.isBlocked){
            res.status(400).json({message:"Cannot add comment"})
        }else{
            const comment=new commentModel({commentBody,createdBy:req.user._id,productId:product._id})
            const savedcomment=await comment.save()
            const productcommented=await productModel.updateOne({_id:productId},{ $push: { comments: savedcomment._id} },{new:true})
            res.status(201).json({message:"done",savedcomment})
        }
    }
    
    
    
}


export const updatecomment=async(req,res)=>{
    const{commentBody}=req.body
    const{id}=req.params
    const user=await userModel.findById(req.user._id)
        if((!user)||user.isDeleteted||user.isBlocked){
            res.status(400).json({message:"Cannot update comment"})
        }else{
const updatedcomment=await commentModel.findOneAndUpdate({_id:id,createdBy:req.user._id},{commentBody},{new:true})
updatedcomment?res.status(200).json({message:"done",updatedcomment}):res.status(400).json({message:"comment not found OR The comment doesnot belong to you"})

}}

export const softDeletecomment=async(req,res)=>{
   
    const{id}=req.params
    const comment=await commentModel.findById(id)
    const product=await productModel.findById(comment.productId)
    const user=await userModel.findById(req.user._id)
        if((!user)||user.isDeleteted||user.isBlocked){
            res.status(400).json({message:"Cannot delete comment"})
        }else{
    if(comment.createdBy.equals(req.user._id)||product.createdBy.equals(req.user._id)){
        const updatedcomment=await commentModel.updateOne({_id:id},
            {isDeleteted:true,DeletedBy:req.user._id},{new:true})
        res.status(200).json({message:"done",updatedcomment})
    
    }else{
        res.status(400).json({message:"cannot delete comment"})
    }
    
}}
