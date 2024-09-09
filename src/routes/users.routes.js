import { Router } from 'express'
import { find, index, store } from '../controllers/user.controller.js'
import { uploadImage } from '../config/multer.js'
import { handleError } from '../middlewares/middleware.js'

const router = Router()

router.get('/', index)
router.get('/:id', find)
router.post('/', uploadImage.single('image'), handleError, store)

export default router
