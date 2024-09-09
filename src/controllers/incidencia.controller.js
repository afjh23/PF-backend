/* eslint-disable camelcase */
import Incidencia from '../models/Incidencia.js'

export const index = async (req, res) => {
  try {
    const incidencias = await Incidencia.all()
    res.json(incidencias)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const find = async (req, res) => {
  try {
    const { id } = req.params
    const incidencia = await Incidencia.getById(id)

    if (incidencia.length === 0) {
      return res.status(404).json({ message: 'Incidencia no encontrada' })
    }

    res.json(incidencia[0])
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const store = async (req, res) => {
  try {
    console.log(req.body)
    const { id_usuario, asunto, tipo, descripcion } = req.body
    const filename = req.file ? req.file.filename : null
    if (!id_usuario || !asunto || !tipo || !descripcion) {
      return res.status(400).json({ message: 'Faltan datos' })
    }

    const nuevaIncidencia = await Incidencia.create({
      id_usuario,
      asunto,
      tipo,
      descripcion,
      imagen: filename
    })

    if (nuevaIncidencia[0].affectedRows === 1) {
      return res.json({ message: 'Incidencia guardada' })
    }

    res.status(500).json({ message: 'Error al guardar la incidencia' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { estado } = req.body

    if (!estado) {
      return res.status(400).json({ message: 'Faltan datos para actualizar el estado' })
    }

    const updatedIncidencia = await Incidencia.updateStatus(id, estado)

    if (updatedIncidencia[0].affectedRows === 1) {
      return res.json({ message: 'Incidencia actualizada' })
    }

    res.status(500).json({ message: 'Error al actualizar la incidencia' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteIncidencia = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Falta el ID de la incidencia' })
    }
    const deletedIncidencia = await Incidencia.deleteById(id)
    if (deletedIncidencia[0].affectedRows === 1) {
      return res.json({ message: 'Incidencia eliminada' })
    }
    res.status(404).json({ message: 'Incidencia no encontrada' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateIncidencia = async (req, res) => {
  try {
    const { id } = req.params
    const { id_usuario, asunto, tipo, descripcion } = req.body
    const filename = req.file ? req.file.filename : null
    if (!id) {
      return res.status(400).json({ message: 'Falta el ID de la incidencia' })
    }
    if (!id_usuario && !asunto && !tipo && !descripcion && !filename) {
      return res.status(400).json({ message: 'No se han proporcionado datos para actualizar' })
    }
    const updatedIncidencia = await Incidencia.update({
      id,
      id_usuario,
      asunto,
      tipo,
      descripcion,
      imagen: filename
    })
    if (updatedIncidencia[0].affectedRows === 1) {
      return res.json({ message: 'Incidencia actualizada' })
    }

    res.status(404).json({ message: 'Incidencia no encontrada' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
