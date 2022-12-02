import { Router } from 'express'
import { confirmEmail, forgetPassword, sendEmailforgetPassword, signIn, signup } from '../controllers/auth.controller.js'
import{validation} from '../middleware/validation.js'
import * as validators from '../validators/auth.validator.js'
const router = Router()

router.post('/signup',validation(validators.signup)  ,signup)
router.get('/confirmEmail/:token',validation(validators.confirmEmail),confirmEmail)
router.post('/signin',validation(validators.signin),signIn)

router.patch("/sendEmailforgetPassword" ,validation(validators.sendEmailforgetPassword), sendEmailforgetPassword)
router.patch("/forgetPassword/:token" ,validation(validators.forgetPassword), forgetPassword)



export default router