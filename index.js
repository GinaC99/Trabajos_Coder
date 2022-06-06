const express = require('express');
const Contenedor= require('./control_usuarios')
const PORT = 8080;
// const datos_users = require('./control_usuarios')
app = express()
const Productos = new Contenedor('gina')
const server = app.listen(PORT, () => {
    console.log(`El puerto es ${server.address().port}`)
})
server.on(`Error`, error => { console.log(`El error es ${error}`) })

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.get('/productos',async (req,res)=>{
    console.log('Incoming request for /productos')
    const data= await Productos.getAll()
    res.send(data)
})
app.get('/productoRandom', async(req,res)=>{
    const data = await (Productos.getAll())
    const resultados = []
    Object.keys(data).map((res)=>{
        resultados.push(data[res].id)
    })
    const valor = Math.floor(Math.random() * (resultados.length))
    const valId= data[valor].id
    const mostraResult = await Productos.getById(valId)
    res.send(mostraResult)
})

