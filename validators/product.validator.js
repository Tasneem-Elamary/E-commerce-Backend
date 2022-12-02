import joi from 'joi'

export const addproduct = {
    body: joi.object().required().keys({
        title: joi.string().required(),
        description: joi.string().required(),
        price:joi.number().required() 
    }),
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}

export const deleteproduct = {
    
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}

export const likeproduct = {
    params:joi.object().required().keys({
        id:joi.string().required()
    }),
    headers: joi.object().required().keys({
        authentcation: joi.string().required(),
        rfreshtoken: joi.string().required(),
    }).options({ allowUnknown: true })
}