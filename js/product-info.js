let id_producto = localStorage.getItem('producto_id');
let user_name = localStorage.getItem("nombreUsuario");
let calificacion_usuario;
let comentarios_recuperados = [];
let nueva_compra;
let productos_carrito = JSON.parse(localStorage.getItem("productos_por_comprar"));
console.log(productos_carrito);
console.log(typeof(productos_carrito));


/* ....................................................................................................... */

function carousel(images) {     //  Entrega 4 - DESAFÍO:

    let fotos = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      <div class="carousel-item active">
                        <img src="${images[0]}" class="d-block w-100" alt="">
                      </div>`

    for (let i = 1; i < images.length; i++) {
        fotos += `<div class="carousel-item">
                        <img src="${images[i]}" class="d-block w-100" alt="">
                      </div>`
    }

    fotos += `</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                    </div>`;
    return fotos;
}

/* ....................................................................................................... */


function guardarCompra(nueva_compra) {         // ENTREGA 5 - DESAFÍO:
        
    nueva_compra = {
        count: 1,
        currency: nueva_compra.currency,
        id: id_producto,
        image: nueva_compra.images[0],
        name: nueva_compra.name,
        unitCost: nueva_compra.cost,
        subtotal: nueva_compra.cost
    }

    console.log(nueva_compra)
    productos_carrito.push(nueva_compra);
    console.log(productos_carrito)


    productos_carrito = JSON.stringify(productos_carrito);
    localStorage.setItem("productos_por_comprar", productos_carrito);
}


function productoInfo(info) {   // ENTREGA 3.2: TOMAR ID DEL PRODUCTO Y MOSTRAR DETALLES DEL MISMO.
    let producto_a_agregar = `
        <div class="text-center p-4">
        <h2> ${info.name}</h2>
        </div>
        ${carousel(info.images)}
        <br>
        <div>
        <h5 id="desc_prod">${info.description}</h5><br> 
            <h5>Categoría</h5>
            <p> ${info.category}</p>  
            <h5>Precio</h5>
            <p> ${info.currency} ${info.cost}</p>
            <h5>Cantidad de vendidos</h5>
            <p> ${info.soldCount} vendidos. </p>     
            <button class="btn btn-primary" type="button" id="comprar">Comprar</button>       
        </div>`;

    document.getElementById('datos_producto').innerHTML += producto_a_agregar;
    document.getElementById("comprar").addEventListener("click", () => {
        guardarCompra(info);
    })

    ver_relacionados(info);

}

/* ....................................................................................................... */

function total_comentarios(comentarios) {     // ENTREGA 3.3: TRAER Y MOSTRAAR COMENTARIOS DEL PRODUCTO.

    for (let i = 0; i < comentarios.length; i++) {

        if (comentarios[i] !== null) {
            let comentario_cliente = `<div>
            <p><strong>${comentarios[i].user} - </strong>${stars(comentarios[i].score)}</p>
            <small>${comentarios[i].dateTime} </small>
            <p>${comentarios[i].description}</p>
            </div>`;
            document.getElementById('comentarios_totales').innerHTML += comentario_cliente;
        }
    }
}

/* ....................................................................................................... */

function stars(puntos) {     // CALIFICACIÓN DEL PRODUCTO CON ESTRELLAS.
    let estrellas = '';
    if (puntos === undefined) {
        puntos = 5;
    }

    for (let i = 1; i <= 5; i++) {
        if (i <= puntos) {
            estrellas += `<span class="fa fa-star checked" id=${i}></span>`;
        } else {
            estrellas += `<span class="fa fa-star" id=${i}></span>`;
        }
    }
    return estrellas;
}

/* ....................................................................................................... */

function caja_de_comentario() {     // SI USER EN LOCALSTORAGE, MOSTRAR CAJA DE COMENTARIOS.

    let comentario_usuario;
    if (localStorage.getItem('nombreUsuario')) {

        comentario_usuario = ` 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Comentar
            </button>
            
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 id="modalComentar">${user_name} -   </h5>
                            <div id="estrellas_usuario" >`;

        for (let i = 1; i <= 5; i++) {
            comentario_usuario += `<span class="fa fa-star checked" id="${i}"></span>`;
        }

        comentario_usuario += `</div>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body ">
                                <textarea class="comentario" id="comentario_user" placeholder="Ingrese el texto deseado..."></textarea>
                                <div class="container">
                                    <div id='error_textarea'>
                                    </div>
                                </div>
                                <input type="button" class="btn btn-primary col-12 " value="Enviar" id="btn_comentar">
                            </div>
                        </div>   
                    </div>
                </div>
                </div>`;

        document.getElementById('caja_de_comentario').innerHTML = comentario_usuario;
        usuario_comentar();

    } else {
        comentario_usuario = '<p><a href="index.html">Inicie sesión</a> para comentar el producto.</p>';
        document.getElementById('caja_de_comentario').innerHTML = comentario_usuario;

    }
}

/* ....................................................................................................... */

function usuario_puntaje() {     // Calificar usando las estrellas en la caja de comentario.    
    let green_stars = document.getElementById('estrellas_usuario');
    green_stars.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            green_stars.innerHTML = stars(e.target.id);
            calificacion_usuario = e.target.id;
        }
    })
}

/* ....................................................................................................... */

function date_time() {
    let fecha_hora = new Date();
    let dia = fecha_hora.getDate();
    let mes = fecha_hora.getMonth() + 1;
    let minutos = fecha_hora.getMinutes();
    let segundos = fecha_hora.getSeconds();

    //Formato para  números < 10;

    if (dia < 10) {
        dia = '0' + dia;
    }

    if (mes < 10) {
        mes = '0' + mes;
    }

    if (minutos < 10) {
        minutos = '0' + minutos;
    }

    if (segundos < 10) {
        segundos = '0' + segundos;
    }

    let fecha_actual = `${fecha_hora.getFullYear()}-${mes}-${dia}`;
    let hora_actual = fecha_hora.getHours() + ":" + minutos + ":" + segundos;
    return fecha_actual + ' ' + hora_actual;

}

/* ....................................................................................................... */

function usuario_comentar() {       // ENTREGABLE 3: DESAFÍO: 

    let btn_comentar = document.getElementById('btn_comentar');
    let comentario_sin_texto = document.getElementById('error_textarea');
    usuario_puntaje();

    btn_comentar.addEventListener('click', () => {

        let texto_comentario = document.getElementById("comentario_user");

        let user_comment;
        if (texto_comentario.value != '') {
            user_comment = {

                product: id_producto,
                score: calificacion_usuario,
                description: texto_comentario.value,
                user: user_name,
                dateTime: date_time(),                  // fecha_actual + ' ' + hora_actual,
            };
            comentario_sin_texto.innerHTML = '';
            calificacion_usuario = 5;

        } else {    // Mensaje para iniciar sesión y poder comentar.
            comentario_sin_texto.innerHTML = `<small style='color: red'>Debe ingresar un texto para poder comentar.</sma>`
        }

        comentarios_recuperados.push(user_comment);
        total_comentarios([user_comment]);

        document.getElementById('estrellas_usuario').innerHTML = stars(5);
        texto_comentario.value = "";
        localStorage.setItem('comentarios_' + id_producto, JSON.stringify(comentarios_recuperados));

    })
}

/* ....................................................................................................... */

function recuperar_comentarios() {      // // ENTREGABLE 3: DESAFÍO - Mostrar comentarios recuperados del local storage.
    if (localStorage.getItem('comentarios_' + id_producto)) {
        comentarios_recuperados = JSON.parse(localStorage.getItem('comentarios_' + id_producto));
        total_comentarios(comentarios_recuperados);
    }
}

/* ....................................................................................................... */

function ver_relacionados(prod_actual) {    //  ENTREGA - 4.1: MOSTRAR PRODUCTOS RELACIONADOS.

    let prod_relacionados = document.getElementById("prod_relacionados");
    let anterior_posterior = `
            <button type="button" class="btn btn-outline-default" data-bs-toggle="modal" data-bs-target="#ver_relacionados">
                Relacionados
            </button>
            <div class="modal fade" id="ver_relacionados" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Productos relacionados:</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="container">
                            <div class="modal-body row">`;

    for (let relacionado of prod_actual.relatedProducts) {

        anterior_posterior += `<div class="card col w-100" id="${relacionado.id}">
        <img src="${relacionado.image}" alt="${relacionado.name}" class="card-img-top">
            <div class="card-body">
                <p class="card-text">${relacionado.name}</p>
            </div>
        </div>`;
    }

    anterior_posterior += `</div>
                        </div>
                    </div>
                </div>
            </div>`;

    prod_relacionados.innerHTML = anterior_posterior;

    let elementos_relacionados = document.getElementsByClassName('card');
    for (let card of elementos_relacionados) {
        card.addEventListener('click', () => {
            localStorage.setItem('producto_id', card.id);
            window.location = 'product-info.html';
        })
    }
}

/* ....................................................................................................... */

if (!('producto_id' in localStorage)) {      // Si se intenta entrar directamente a product-info.html sin que haya id_producto guardado, redirige a categories.html
    window.location = 'categories.html';
}

fetch(PRODUCT_INFO_URL + id_producto + '.json')     // INICIO DE EJECUCIÓN.
    .then(response => response.json())
    .then(info => {
        productoInfo(info);

        fetch(PRODUCT_INFO_COMMENTS_URL + id_producto + '.json')
            .then(response => response.json())
            .then(comentarios => {
                total_comentarios(comentarios);
                recuperar_comentarios();

            })
            .catch(error => console.log(error));

        caja_de_comentario();
    })
    .catch(error => console.log(error));