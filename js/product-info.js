// VARIABLES GLOBALES.
const id_producto = localStorage.getItem('producto_id');
let calificacion_usuario;
let comentarios_recuperados = [];

/* ....................................................................................................... */

function productoInfo(info) {   // ENTREGA 3.2: TOMAR ID DEL PRODUCTO Y MOSTRAR DETALLES DEL MISMO.

    let producto_a_agregar = `        
        <h2> ${info.name}</h2>
        <div>`;

    for (let i = 0; i < info.images.length; i++) {
        producto_a_agregar += `<img src='${info.images[i]}' href=''>`;

    }

    producto_a_agregar += `</div>
        <div>
            <h5>Precio</h5>
            <p> ${info.currency} ${info.cost}</p>
            <h5>Descripción</h5>
            <p> ${info.description}</p>            
            <h5>Categoría</h5>
            <p> ${info.category}</p>            
            <h5>Cantidad de vendidos</h5>
            <p> ${info.soldCount} vendidos. </p>            
        </div>`;

    document.getElementById('datos_producto').innerHTML += producto_a_agregar;
}

/* ....................................................................................................... */

function total_comentarios(comentarios) {     // ENTREGA 3.3: TRAER Y MOSTRAAR COMENTARIOS DEL PRODUCTO.
    let comentario_cliente = ``;

    for (let comentario of comentarios) {
        if (comentario !== null){
            comentario_cliente += `<div>
            <strong>${comentario.user} -</strong> ${stars(comentario.score)}<br>
            - ${comentario.dateTime} -  <br>
            ${comentario.description}
            </div>`;
        }
    }

    document.getElementById('comentarios_totales').innerHTML += comentario_cliente;
}

/* ....................................................................................................... */

function stars(puntos) {     // CALIFICACIÓN DEL PRODUCTO CON ESTRELLAS.
    let estrellas = '';
    if (puntos === undefined) {
        puntos = 5;
    }

    for (i = 1; i <= 5; i++) {
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

        comentario_usuario = `<form action="" id="">
            <fieldset>
                <legend>
                    <h5>${usuario}</h5><br>
                    <div id="estrellas_usuario">`;

        for (let i = 1; i <= 5; i++) {
            comentario_usuario += `<span class="fa fa-star checked" id="${i}"></span>`;
        }

        comentario_usuario += `</div>
                </legend>             
                <textarea class="comentario" id="comentario_user" placeholder="Ingrese el texto deseado..."></textarea>
                <div id='error_textarea'></div>
                <input type="button" value="Comentar" id="btn_comentar">
        <fieldset>
        </form>`;

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

function date_time(){
    let fecha_hora = new Date();
        let dia = fecha_hora.getDate();
        let mes = fecha_hora.getMonth() + 1;
        let minutos = fecha_hora.getMinutes();
        let segundos = fecha_hora.getSeconds();

        //Formato para  números < 10;

        if (dia < 10){
            dia = '0' + dia;
        } 

        if (mes < 10){
            mes = '0' + mes;
        }

        if (minutos < 10){
            minutos = '0' + minutos;
        }

        if (segundos < 10){
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
                dateTime: date_time(),                  // fecha_actual + ' ' + hora_actual,
                description: texto_comentario.value,
                product: id_producto,
                score: calificacion_usuario,
                user: localStorage.getItem("nombreUsuario")
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