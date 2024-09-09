import express from 'express'
import { getAllComentarios, getComentariosByIncidencia, createComentario, updateComentario, deleteComentario } from '../controllers/comentario.controller.js'

const router = express.Router()

router.get('/', getAllComentarios)
router.get('/:incidencia_id', getComentariosByIncidencia)
router.post('/', createComentario)
router.put('/:id', updateComentario)
router.delete('/:id', deleteComentario)

export default router
