import User from '../models/User.js'

export const index = async (req, res) => {
  console.log('Hola')
  try {
    const usuarios = await User.all()
    console.log(usuarios)
    res.json(usuarios)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const find = async (req, res) => {
  try {
    const { id } = req.params
    const usuario = await User.getById(id)

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.json(usuario[0]) // usuario[0] para devolver solo el objeto de usuario
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const store = async (req, res) => {
  try {
    const { nombre, apellido, email, password, rol } = req.body
    const filename = nombre

    if (!nombre || !apellido || !email || !password || !rol) {
      return res.status(400).json({ message: 'Faltan datos' })
    }

    const nuevoUsuario = await User.create({
      nombre,
      apellido,
      email,
      password,
      rol,
      imagen: filename
    })

    if (nuevoUsuario[0].affectedRows === 1) {
      return res.json({ message: 'Usuario guardado' })
    }

    res.status(500).json({ message: 'Error al guardar el usuario' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
