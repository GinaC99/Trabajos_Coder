
async function showinputId() {
    const basePath = 'http://localhost:8080/api';
    const id = document.getElementById('value__Id-Search').value
    let respuesta = await fetch(`${basePath}/productos/${id}`)
        .then(response => response.json())
    // .then(data => {return data});
    console.log(respuesta);
};

async function showAllProducts() {
    const basePath = 'http://localhost:8080/api';
    let respuesta = await fetch(`${basePath}/productos`)
        .then(response => response.json())
        .then(data => { return data });
    console.log(respuesta);
};

async function createProducts() {
    const data = {};
    const basePath = 'http://localhost:8080/api';
    data.tittle = (document.getElementById('value__tittle').value);
    data.price = (document.getElementById('value__price').value);
    data.thumbnail = (document.getElementById('value__url').value);
    const dataSend = await fetch(`${basePath}/productos`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(datas => { return datas });
    console.log(dataSend)
};

async function updateProduct() {
    const data = {};
    const basePath = 'http://localhost:8080/api';
    const id = document.getElementById('value__Id-Update').value
    data.tittle = (document.getElementById('value__tittle-Update').value);
    data.price = (document.getElementById('value__price-Update').value);
    data.thumbnail = (document.getElementById('value__url-Update').value);
    const dataSend = await fetch(`${basePath}/productos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(datas => { return datas });
    console.log(dataSend)
};

async function deletId() {
    const basePath = 'http://localhost:8080/api';
    const id = document.getElementById('value__Id-Delete').value
    let respuesta = await fetch(`${basePath}/productos/${id}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
    // .then(data => {return data});
    console.log(respuesta);
};