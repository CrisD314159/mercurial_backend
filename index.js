import express from 'express'
import Routes from './routes/routes.js'
import { MercurialModel } from './model/model.js'
import jwt from 'jsonwebtoken'

// Ecmascript
// CommonJS

const app = express()

const port = 8080

app.use(express.json())
app.use((req, res, next) => {
  const cookie = req.cookies.authMercurial
  try {
    const data = jwt.verify(cookie, process.env.JWT_PASSWORD)
    req.user = data
  } catch (e) {}
  next()
})

app.use('/', Routes({ model: MercurialModel }))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto http://localhost:${port} 🚀`)
})

//
