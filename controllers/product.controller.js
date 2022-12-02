import { productModel } from "../DB/models/product.model.js"
import { userModel } from "../DB/models/user.model.js"
import { checkprofile } from "../services/checkProfile.js"

export const addproduct=async(req,res)=>{
    const{title,price,description}=req.body
    const user=await userModel.findById(req.user._id)

    if(checkprofile(user)){
        res.status(200).json({ message: "you must complete you data" })
    }else{
        if(user.isDeleteted||user.isBlocked){
            res.status(400).json({message:"Cannot add product"})
        }else{
            const product=new productModel({title,price,description,createdBy:req.user._id})
            const savedproduct=await product.save()
            res.status(201).json({message:"done",savedproduct})
        }
    }
    
    
}

export const updateproduct=async(req,res)=>{
    const{title,price,description}=req.body
   
    const product=await productModel.findById(req.params.id)
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        const product=await productModel.updateOne({_id:req.params.id,createdBy:req.user._id},{price,description})
       
        res.status(200).json({message:"done",product})
    }
    
}

export const deleteproduct=async(req,res)=>{
    
    const product=await productModel.findById(req.params.id)
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        const product=await productModel.deleteOne({_id:req.params.id,createdBy:req.user._id})
       
        res.status(200).json({message:"done",product})
    }
    
}

export const softdeleteproduct=async(req,res)=>{
    //console.log(req.params.id);
    const product=await productModel.findById(req.params.id)
    
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        const product=await productModel.updateOne({_id:req.params.id,createdBy:req.user._id},{isDeleteted:true})
       
        res.status(200).json({message:"done",product})
    }
    
}

export const getproductById=async(req,res)=>{
    
    const product=await productModel.findById(req.params.id)
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        
       
        res.status(200).json({message:"done",product})
    }
    
}

export const searchproductBytitle=async(req,res)=>{
    try {
        const title=req.query['title']
        console.log(title);
    const products=await productModel.find({title:title})
    
    if(!products){
        res.status(400).json({message:" there are not products with this title"})
    }else{
        
       
        res.status(200).json({message:"done",products})
    }
    } catch (error) {
        res.status(500).json({message:"error",error})
    }
    
    
}

export const likeProduct=async(req,res)=>{
    
    const user=await userModel.findById(req.user._id)
   
    const product=await productModel.findById(req.params.id)
    
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        if(user._id.equals(product.createdBy)){
            res.status(400).json({message:" you cannot like your product"})
        }else{
            if(product.likes.includes(user._id)){
                res.status(400).json({message:" you aleady like the product"})
            }else{
                const likedproduct=await productModel.updateOne({_id:req.params.id},{ $push: { likes: user.id} },{new:true})
                res.status(200).json({message:"done",likedproduct})
            }
            
    }
        }     
    
}

export const unlikeProduct=async(req,res)=>{
    const user=await userModel.findById(req.user._id)
    
    
    const product=await productModel.findById(req.params.id)
    
    if(!product){
        res.status(400).json({message:" product Not found"})
    }else{
        if(user._id.equals(product.createdBy)){
            res.status(400).json({message:" you cannot unlike your product"})
        }else{
            if(!(product.likes.includes(user._id))){
                res.status(400).json({message:" you aleady unlike the product"})
            }else{
                const likedproduct=await productModel.updateOne({_id:req.params.id},{ $pull: { likes: user.id} },{new:true})
                res.status(200).json({message:"done",likedproduct})
            }
            
    }
        }     
}

export const getAllProductsWithComments=async(req,res)=>{
    const user=await userModel.findById(req.user._id)
    if(user.isDeleteted||user.isBlocked){
        res.status(400).json({message:"Cannot get products"})
    }else{
    const products=await productModel.find({isDeleteted:false}).populate([
        {
            path: "comments",
            select: "commentBody",
            match: { isDeleteted: false }
        },

    ])
    res.status(200).json({ message: "Done", products })
}}







