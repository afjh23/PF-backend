import { pool } from '../config/db.js'
import { hash } from 'bcrypt'

class User {
  static async all () {
    const usuarios = await pool.execute('SELECT * FROM usuarios')
    return usuarios[0]
  }

  static async getById (id) {
    const usuario = await pool.execute('SELECT * FROM usuarios WHERE id = ?', [id])
    return usuario[0]
  }

  static async where (campo, valor) {
    const usuario = await pool.execute(`SELECT * FROM usuarios WHERE ${campo} = ?`, [valor])
    return usuario[0]
  }

  static async create ({ nombre, apellido, email, password, imagen, rol }) {
    const encriptado = await hash(password, 10)
    const campos = ['nombre', 'apellido', 'email', 'password', 'rol']
    const values = [nombre, apellido, email, encriptado, rol]

    if (imagen) {
      campos.push('imagen')
      values.push(imagen)
    }

    const camposString = campos.join(', ')
    const placeholders = values.map(() => '?').join(', ')

    const nuevoUsuario = await pool.execute(`INSERT INTO usuarios(${camposString}) VALUES (${placeholders})`, values)

    return nuevoUsuario
  }

  static async getByEmail (email) {
    const usuario = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email])
    return usuario[0]
  }
}

export default User
