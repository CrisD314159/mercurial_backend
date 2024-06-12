import express from 'express'
import Routes from './routes/routes'
import MercurialModel from './model/model'
// Ecmascript
// CommonJS

const app = express()

const port = 8080

app.use(express.json())

app.use('/', Routes({ model: MercurialModel }))

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`)
})

//
