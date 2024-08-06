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
// app.use(cors({
//   origin: (origin, callback) => {
//     const allowedOrigins = ['http://localhost:5173', 'https://mercurial-app.vercel.app']
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true
// }))

const whitelist = ['https://mercurial-app.vercel.app']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
app.use(cookieParser()) // Middleware para cookies, permite cargar, leer y escribir cookies

// app.use((req, res, next) => {
//   if (req.cookies.authMercurial) { // Si existe la cookie
//     const cookie = req.cookies.authMercurial // Obtener la cookie
//     try {
//       const data = jwt.verify(cookie, process.env.JWT_PASSWORD) // Verificar la cookie con el JWT_PASSWORD
//       req.session = { user: data } // Crear la session, en este caso agregamos un objeto user nulo al objeto session = { session: { user: null}}
//     } catch (e) {
//       if (e.name === 'TokenExpiredError') { // Si el error es de tipo TokenExpiredError entoces la cookie expiró, por lo tanto se debe borrar y enviar un mensaje no autorizado
//         req.session = 'expired'
//       }
//     }
//   }

//   next()
// })

app.use((req, res, next) => {
  const authHeader = req.headers.authorization

  if (authHeader) {
    const token = authHeader.split(' ')[1]

    if (!token) {
      return next()
    }

    try {
      const data = jwt.verify(token, process.env.JWT_PASSWORD)
      req.session = { user: data }
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        req.session = 'expired'
      } else {
        console.error('Error verifying token:', e)
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
