import express from 'express'
import Routes from './routes/routes.js'
import { MercurialModel } from './model/model.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// process.loadEnvFile()
import 'dotenv/config'

// Ecmascript
// CommonJS

const app = express()

const port = process.env.PORT ?? 8000

app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true

}))
app.use(cookieParser()) // Middleware para cookies, permite cargar, leer y escribir cookies
app.use((req, res, next) => {
  if (req.cookies.authMercurial) { // Si existe la cookie
    const cookie = req.cookies.authMercurial // Obtener la cookie
    try {
      const data = jwt.verify(cookie, process.env.JWT_PASSWORD) // Verificar la cookie con el JWT_PASSWORD
      req.session = { user: data } // Crear la session, en este caso agregamos un objeto user nulo al objeto session = { session: { user: null}}
    } catch (e) {
      if (e.name === 'TokenExpiredError') { // Si el error es de tipo TokenExpiredError entoces la cookie expiró, por lo tanto se debe borrar y enviar un mensaje no autorizado
        req.session = 'expired'
      }
    }
  }

  next()
})

app.use('/', Routes({ model: MercurialModel }))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port} 🚀`)
})

//
