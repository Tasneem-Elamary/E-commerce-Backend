import { userSchema } from "../DB/models/user.model.js"

export const checkprofile=(user ) =>{
   

        const uncompletedfields=[]

    for (var key of Object.keys(userSchema.obj)) {
        if(user[key]==undefined){
            uncompletedfields.push(key)

          
        }}
        if (uncompletedfields.length) {
            return 1
          
        } else {
            return 0
        }
        
    }
