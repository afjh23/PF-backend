/* eslint-disable camelcase */
import { pool } from '../config/db.js'

class Incidencia {
  static async all () {
    const incidencias = await pool.execute('SELECT * FROM incidencias')
    return incidencias[0]
  }

  static async getById (id) {
    const incidencia = await pool.execute('SELECT * FROM incidencias WHERE id_incidencia = ?', [id])
    return incidencia[0]
  }

  static async where (campo, valor) {
    const incidencias = await pool.execute(`SELECT * FROM incidencias WHERE ${campo} = ?`, [valor])
    return incidencias[0]
  }

  static async create ({ id_usuario, asunto, tipo, descripcion, imagen }) {
    const campos = ['id_usuario', 'asunto', 'tipo', 'descripcion']
    const values = [id_usuario, asunto, tipo, descripcion]

    if (imagen) {
      campos.push('imagen')
      values.push(imagen)
    }

    const camposString = campos.join(', ')
    const placeholders = values.map(() => '?').join(', ')

    const nuevaIncidencia = await pool.execute(`INSERT INTO incidencias(${camposString}) VALUES (${placeholders})`, values)

    return nuevaIncidencia
  }

  static async updateStatus (id, estado) {
    const updatedIncidencia = await pool.execute('UPDATE incidencias SET estado = ? WHERE id_incidencia = ?', [estado, id])
    return updatedIncidencia
  }

  static async getByUserId (id_usuario) {
    const incidencias = await pool.execute('SELECT * FROM incidencias WHERE id_usuario = ?', [id_usuario])
    return incidencias[0]
  }

  static async deleteById (id) {
    const deletedIncidencia = await pool.execute('DELETE FROM incidencias WHERE id_incidencia = ?', [id])
    return deletedIncidencia
  }

  static async update ({ id, id_usuario, asunto, tipo, descripcion, imagen }) {
    const campos = []
    const values = []

    if (id_usuario) {
      campos.push('id_usuario = ?')
      values.push(id_usuario)
    }

    if (asunto) {
      campos.push('asunto = ?')
      values.push(asunto)
    }

    if (tipo) {
      campos.push('tipo = ?')
      values.push(tipo)
    }

    if (descripcion) {
      campos.push('descripcion = ?')
      values.push(descripcion)
    }

    if (imagen) {
      campos.push('imagen = ?')
      values.push(imagen)
    }

    if (campos.length === 0) {
      throw new Error('No se han proporcionado datos para actualizar')
    }

    const camposString = campos.join(', ')
    values.push(id)

    const updatedIncidencia = await pool.execute(`UPDATE incidencias SET ${camposString} WHERE id_incidencia = ?`, values)

    return updatedIncidencia
  }
}

export default Incidencia
