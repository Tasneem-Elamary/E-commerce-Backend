import joi from 'joi'

export const addcomment = {
    body: joi.object().required().keys({
        commentBody: joi.string().required(),
        
    }),
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true }),
    params:joi.object().required().keys({
        productId:joi.string().required()
    }),
}

export const updatecomment = {
    body: joi.object().required().keys({
        commentBody: joi.string().required(),
        
    }),
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true }),
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
}
export const softdeletecomment = {
    
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true }),
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
}