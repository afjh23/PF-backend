/* eslint-disable camelcase */
import Comentario from '../models/Comentario.js'

export const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await Comentario.all()
    res.json(comentarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getComentariosByIncidencia = async (req, res) => {
  try {
    const { incidencia_id } = req.params
    const comentarios = await Comentario.getByIncidenciaId(incidencia_id)
    res.json(comentarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createComentario = async (req, res) => {
  try {
    console.log(req.body)
    const { id_incidencia, id_usuario, comentario } = req.body
    if (!id_incidencia || !id_usuario || !comentario) {
      return res.status(400).json({ message: 'Faltan datos para crear el comentario' })
    }

    const nuevoComentario = await Comentario.create({ id_incidencia, id_usuario, comentario })
    res.status(201).json({ message: 'Comentario creado', nuevoComentario })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateComentario = async (req, res) => {
  try {
    const { id } = req.params
    const { comentario } = req.body
    if (!comentario) {
      return res.status(400).json({ message: 'Falta el texto del comentario para actualizar' })
    }

    const updatedComentario = await Comentario.update({ id, comentario })
    res.json({ message: 'Comentario actualizado', updatedComentario })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params
    const deletedComentario = await Comentario.deleteById(id)
    res.json({ message: 'Comentario eliminado', deletedComentario })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
