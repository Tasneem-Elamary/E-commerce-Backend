import joi from 'joi'

export const updateProfile = {
    body: joi.object().required().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required()
        
        
    }),
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}

export const softDeleteProfile = {
   
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}

export const signout = {
   
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}

export const updatePassword = {
    body: joi.object().required().keys({
        oldPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        newPassword: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required()
    }),

    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
    
}