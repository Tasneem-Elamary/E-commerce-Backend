import { Router } from 'express'
import { addcomment, softDeletecomment, updatecomment } from '../controllers/comment.controller.js'
import { auth } from '../middleware/authentication.js'
import{validation} from '../middleware/validation.js'
import * as validators from '../validators/comment.validator.js'
const router = Router()



 router.post("/:productId",validation(validators.addcomment), auth(), addcomment)
 router.patch("/:id", validation(validators.updatecomment),auth(), updatecomment)
 router.patch("/softDelete/:id", validation(validators.softdeletecomment),auth(), softDeletecomment)



export default router