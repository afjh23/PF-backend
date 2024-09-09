import express from 'express'
import { PORT } from './config/config.js'
import usersRoutes from './routes/users.routes.js'
import authRoutes from './routes/auth.routes.js'
import incidenciasRoutes from './routes/incidencias.routes.js'
import comentariosRoutes from './routes/comentarios.routes.js'
import { validateCORS } from './middlewares/middleware.js'
import morgan from 'morgan'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(validateCORS)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/incidencias', incidenciasRoutes)
app.use('/api/comentarios', comentariosRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
