const express = require('express');
const Contenedor = require('./control_usuarios')
const PORT = 8080;
const cors = require('cors')
// const datos_users = require('./control_usuarios')
app = express()
const Productos = new Contenedor('gina')
const apiProducts = express.Router()
app.use(cors())

app.use('/api', apiProducts)

// esta es a configuracion del servidor
const server = app.listen(PORT, () => {
    console.log(`El puerto es ${server.address().port}`)
})
server.on(`Error`, error => { console.log(`El error es ${error}`) })
// ----------------------------

apiProducts.use(express.json())
app.get('/', (req, res) => {
    res.send('Server is running')
})
// mostart todos los productos
apiProducts.get('/productos', async (req, res) => {
    console.log('Incoming request for /productos')
    const data = await Productos.getAll()
    res.send(data)
})
// mostrar un producto por ID
apiProducts.get('/productos/:id', async (req, res) => {
    console.log('Incoming request ----> getProductsId')
    const id = (req.params.id);
    const dataId = await (Productos.getById(id))
    res.send(dataId)
})
// Agregar un producto y retornar el ID
apiProducts.post('/productos', async (req, res) => {
    console.log('Incommin reques post')
    const dataFront = req.body;
    console.log(dataFront)
    const newObjectBack = await Productos.save(dataFront)
    res.status(200).send({
        id: JSON.parse(newObjectBack)
    }
    )
})

apiProducts.put('/productos/:id', async (req, res) => {
    console.log('Incoming request PUT')
    const dataSend = req.body;
    const id = req.params.id;
    try {
        const answer = await (Productos.updateById(id, dataSend));
        res.send('Success')

    } catch (e) {
        console.log(e)
        res.send({
            error: 'Producto no encontrado'
        })
    }
})
apiProducts.delete('/productos/:id', (req, res) => {
    console.log('Incoming request ----> Delete')
    const id = req.params.id;
    const deleteByID = Productos.deleteById(id)
    res.send(deleteByID)
})