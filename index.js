import express from 'express'
import Routes from './routes/routes.js'
import { MercurialModel } from './model/model.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// process.loadEnvFile()
import 'dotenv/config'
import helmet from 'helmet'

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

const whitelist = ['https://mercurial-app.vercel.app', 'http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(helmet())
app.options('*', cors(corsOptions))
app.use(cookieParser()) // Middleware para cookies, permite cargar, leer y escribir cookies

// app.use((req, res, next) => {
//   const authHeader = req.headers.authorization

//   if (authHeader) {
//     const token = authHeader.split(' ')[1]

//     if (!token) {
//       return next()
//     }

//     try {
//       const data = jwt.verify(token, process.env.JWT_PASSWORD)
//       req.session = { user: data }
//     } catch (e) {
//       if (e.name === 'TokenExpiredError') {
//         req.session = 'expired'
//       } else {
//         console.error('Error verifying token:', e)
//       }
//     }
//   }

//   next()
// })

app.use('/', Routes({ model: MercurialModel }))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port} 🚀`)
})

//
