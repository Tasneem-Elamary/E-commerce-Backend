import { userModel } from "../DB/models/user.model.js"
import jwt from 'jsonwebtoken'



export const auth=()=>{
return async(req,res,next)=>{
    try {
        const {authentcation}=req.headers
        console.log({authentcation});
        
        const decoded=jwt.verify(authentcation,'access token')

        if(decoded&&decoded.id){
            const user=await userModel.findById(decoded.id).select('email firstName Role')
            if(user){
                req.user=user
               
                next()
                
                
            }else{
                res.json({message:"not register user"})
            }
        
        }else{
            res.json({message:"invalid payload token"})
        }
    } catch (error) {
        if(error.message=="jwt expired"){
            console.log(error.message);
            const {rfreshtoken}=req.headers
            
            const decoded=jwt.verify(rfreshtoken,'refresh token')
          
        if(decoded&&decoded.id){
            const user=await userModel.findById(decoded.id).select('email firstName')
            console.log(user);
            if(user){
            const acesstoken=jwt.sign({id:user._id,isLoggedIn: true },'access token', { expiresIn:"1h" })
            //console.log({acesstoken});
            res.json({message:"new acess token",acesstoken})
            // // req.user=user
            // // next()
            // req.headers['authentcation']=acesstoken
            // auth()
        }
       
    }
 
}
    }
}}