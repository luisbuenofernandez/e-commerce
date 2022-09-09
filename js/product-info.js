
let div_en_html = document.getElementById('productos');
let id_producto = localStorage.getItem('producto_id');


function productoInfo(info) {
    let producto_a_agregar = ` <div>       
        <h2> ${info.name}</h2>
        <hr><br>

        <h6>Precio</h6>
        <p> ${info.currency} ${info.cost}</p>

        <h6>Descripción</h6>
        <p> ${info.description}</p>

        <h6>Categoría</h6>
        <p> ${info.category}</p>

        <h6>Cantidad de vendidos</h6>
        <p> ${info.soldCount} vendidos. </p>

        <h6>Imágenes ilustrativas</h6>`;

    for (let i = 0; i < info.images.length; i++) {
        producto_a_agregar += `<div class='imagenes_producto'><img src='${info.images[i]}' href=''></div>
        `;
    }

    producto_a_agregar += '<br></div> ';

    div_en_html.innerHTML += producto_a_agregar;
    console.log(producto_a_agregar);


}


fetch(PRODUCT_INFO_URL + id_producto + '.json')
    .then(response => response.json())
    .then(info => {
        console.log(typeof info);
        console.log(info);
        
        productoInfo(info);
    })