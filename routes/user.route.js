import { Router } from 'express'
import { blockAccount, getAllUsersWithProductsWithComments, getUserById, signOut, softDeleteProfile, updatePassword, updateProfile } from '../controllers/user.controller.js'
import { auth } from '../middleware/authentication.js'
import{validation} from '../middleware/validation.js'
import * as validators from '../validators/user.validator.js'

const router = Router()


router.put('/profile',validation(validators.updateProfile),auth(),updateProfile)
router.patch('/updatepassword',validation(validators.updatePassword),auth(),updatePassword)

router.get('/:id',getUserById)
router.patch("/signout",validation(validators.signout),auth() ,signOut)
router.patch('/profile/softdelete',validation(validators.softDeleteProfile),auth(),softDeleteProfile)
router.patch('/Block/:id',blockAccount)
router.get('/',getAllUsersWithProductsWithComments)

export default router