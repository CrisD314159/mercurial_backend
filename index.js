import express from 'express'
import Routes from './routes/routes.js'
import { MercurialModel } from './model/model.js'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
process.loadEnvFile()

// Ecmascript
// CommonJS

const app = express()

const port = 8080

app.use(express.json())
app.use(cookieParser()) // Middleware para cookies, permite cargar, leer y escribir cookies
app.use((req, res, next) => {
  if (req.cookies.authMercurial) { // Si existe la cookie
    const cookie = req.cookies.authMercurial // Obtener la cookie
    try {
      const data = jwt.verify(cookie, process.env.JWT_PASSWORD) // Verificar la cookie con el JWT_PASSWORD
      req.session = { user: data } // Crear la session, en este caso agregamos un objeto user nulo al objeto session = { session: { user: null}}
    } catch (e) {
      next()
    }
  }

  next()
})

app.use('/', Routes({ model: MercurialModel }))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port} 🚀`)
})

//
