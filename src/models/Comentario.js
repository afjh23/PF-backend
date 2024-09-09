/* eslint-disable camelcase */
import { pool } from '../config/db.js'

class Comentario {
  static async all () {
    const comentarios = await pool.execute('SELECT * FROM comentarios')
    return comentarios[0]
  }

  static async getById (id) {
    const comentario = await pool.execute('SELECT * FROM comentarios WHERE id = ?', [id])
    return comentario[0]
  }

  static async getByIncidenciaId (incidencia_id) {
    const comentarios = await pool.execute('SELECT * FROM comentarios WHERE incidencia_id = ?', [incidencia_id])
    return comentarios[0]
  }

  static async create ({ id_incidencia, id_usuario, comentario }) {
    console.log(id_incidencia)
    const nuevaComentario = await pool.execute(
      'INSERT INTO comentarios (id_incidencia, id_usuario, texto_comentario) VALUES (?, ?, ?)',
      [id_incidencia, id_usuario, comentario]
    )
    return nuevaComentario
  }

  static async update ({ id, comentario }) {
    const updatedComentario = await pool.execute(
      'UPDATE comentarios SET comentario = ? WHERE id = ?',
      [comentario, id]
    )
    return updatedComentario
  }

  static async deleteById (id) {
    const deletedComentario = await pool.execute('DELETE FROM comentarios WHERE id = ?', [id])
    return deletedComentario
  }
}

export default Comentario
