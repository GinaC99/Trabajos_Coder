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
            const getAllData = await this.getAll()
            try {
                Objeto.id = parseInt(getAllData[getAllData.length - 1].id) + 1
            } catch {
                Objeto.id = 1
            }
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
            return(arrayObjetos.filter((res) => res.id === id)).length > 0 ? (arrayObjetos.filter((res) => res.id === id)) : null;
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
    async updateById(id, dataChange) {
        try {
            const idDef = parseInt(id)
            const idUpdate = await this.getById(idDef)
            const dataGen = await this.getAll();
            const AllDataUpdate = [];
            const DataSend = dataChange;
            DataSend.id = id;
            dataGen.filter((response) => {
                if (response.id === idUpdate[0].id) {
                    AllDataUpdate.push(DataSend)
                } else {
                    AllDataUpdate.push(response)
                }
            })
            fs.writeFileSync(this.ruta, JSON.stringify(AllDataUpdate))

        } catch (e) {
            console.log(e);
        }

    }
};
const Gina = new Contenedor('gina')
const Objeto= {
    tittle: 'Prueba 4',
    price: 500,
    thumbnail: 'https://www.recetasgratis.net/receta-de-torta-invertida-de-manzanas-56337.html',
}
const prueba = async () => {
    // await Gina.updateById(2)
    await Gina.save(Objeto)
};
module.exports = Contenedor;