import { Router } from 'express'
import { addproduct, deleteproduct, getAllProductsWithComments, getproductById, likeProduct, searchproductBytitle, softdeleteproduct, unlikeProduct, updateproduct } from '../controllers/product.controller.js'
import { auth } from '../middleware/authentication.js'
import{validation} from '../middleware/validation.js'
import * as validators from '../validators/product.validator.js'

const router = Router()



router.get("/searchBytitle",  searchproductBytitle)
 router.put("/:id",validation(validators.addproduct), auth(), updateproduct)
 router.patch("/softdeleteproduct/:id",validation(validators.deleteproduct), auth(), softdeleteproduct)
 router.delete("/:id",validation(validators.deleteproduct), auth(), deleteproduct)
 router.get("/:id",  getproductById)
 
 router.patch("/likeProduct/:id",validation(validators.likeproduct), auth(), likeProduct)
 router.patch("/unlikeProduct/:id",validation(validators.likeproduct), auth(), unlikeProduct)
 router.post("/",validation(validators.addproduct), auth(), addproduct)
 router.get("/",validation(validators.deleteproduct),auth(),  getAllProductsWithComments)
export default router