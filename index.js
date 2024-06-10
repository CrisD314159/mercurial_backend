import express from 'express'
// Ecmascript
// CommonJS

const app = express()

const port = 8080


app.use(express.json())



app.get('/tareas', (req, res)=> {
  const objeto = {
    nombre: 'pepe',
    apellido: 'perez',
    cedula: 1234234
  
  }
  res.json({objeto:objeto})
})

app.post('/login', (req, res)=>{
  const {usuario, password} = req.body
  
  res.json({mensaje: `Bienvenido de vuelta ${usuario} con password ${password}`})
  //req.body = {usuario: 'pepe', password: '1234'}
  //req.params = {id}

})



app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto ${port}`)
})




//