import { Router } from 'express'
import { find, index, store, deleteIncidencia, updateIncidencia, update } from '../controllers/incidencia.controller.js'
import { uploadImage } from '../config/multer.js'
import { handleError } from '../middlewares/middleware.js'

const router = Router()

router.get('/', index)
router.get('/:id', find)
router.post('/', uploadImage.single('imagen'), handleError, store)
router.patch('/status/:id', handleError, update)
router.patch('/:id', uploadImage.single('image'), handleError, updateIncidencia)
router.delete('/:id', deleteIncidencia)

export default router
