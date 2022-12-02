import joi from 'joi'
export const signup = {
    body: joi.object().required().keys({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().email({
            minDomainSegments: 1,
            tlds: { allow: ['com', 'net', 'edu'] } }).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: joi.string().valid(joi.ref('password')).required(),
        phone:joi.string().required()
    })
}


export const signin = {
    body: joi.object().required().keys({
        email: joi.string().email({
            minDomainSegments: 1,
            tlds: { allow: ['com', 'net', 'edu'] }
        }).required(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
    })
}


export const  confirmEmail =  {
    params:joi.object().required().keys({
        token:joi.string().required()
    })
}

export const  sendEmailforgetPassword =  {
    body:joi.object().required().keys({
        email: joi.string().email({
            minDomainSegments: 1,
            tlds: { allow: ['com', 'net', 'edu'] }
        }).required()
    })
}

export const  forgetPassword =  {
    params:joi.object().required().keys({
        token:joi.string().required()
    }),
    body:joi.object().required().keys({
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        cPassword: joi.string().valid(joi.ref('password')).required()
    })
}

