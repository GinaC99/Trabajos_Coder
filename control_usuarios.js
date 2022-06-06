const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.ruta = `./${nombreArchivo}.txt`;
    }

    async save(Objeto) {
        try {
            let producto = []
            try {
                const archivo = await fs.promises.readFile(this.ruta)
                producto = JSON.parse(archivo)
            } catch (e) {
                const archivo = await fs.promises.writeFile(this.ruta, '')
            }
            Objeto.id = Date.now() + Math.round(Math.random() * 100)
            producto.push(Objeto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(producto))
            return (Objeto.id)
        } catch (e) {
            console.log('Hey, no se pudo guardar el documento de manera correcta, mira este es el error', e)
        }
    }
    async getById(id) {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            const arrayObjetos = JSON.parse(contenido)
            return (arrayObjetos.filter((res) => res.id === id)).length > 0 ? (arrayObjetos.filter((res) => res.id === id)) : null;
        } catch (e) {
            return ('Opss, alg salio mal, intentelo de nuevo mas tarde', e)
        }
    }

    async getAll() {
        try {
            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            const array = JSON.parse(contenido)
            return array;
        } catch (e) {
            return ('Opps', e)
        }
    }
    async deleteAll() {
        try {
            fs.promises.unlink(this.ruta, e => {
                if (e) {
                    return ('Se boro con exito el archivo')
                } else {
                    return ('Opss todo salio bien')
                }
            })
        } catch {

        }
    }
    async deleteById(id) {
        try {

            const contenido = await fs.promises.readFile(this.ruta, 'utf-8')
            const array = JSON.parse(contenido)
            const data = array.filter((res) => res.id != id)
            fs.unlinkSync(this.ruta, e => {
                console.log(e)
            })
            fs.writeFileSync(this.ruta, JSON.stringify(data))
        } catch (e) {
            return ('Opss', e)
        }
    }
};
const Gina = new Contenedor('gina')
const obj2 = {

    title: "Ejemplo 1",
    price: "123456",
    thumbnail: "https://www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Platos-de-comida-que-pides-a-domicilio-y-puedes-hacer-en-casa-945x630.jpg"
}

module.exports = Contenedor;