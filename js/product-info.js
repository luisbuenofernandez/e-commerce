let id_producto = localStorage.getItem('producto_id');
let calificacion_usuario;
let guardar_comentarios = [];
/* ....................................................................................................... */

function productoInfo(info) {   // ENTREGA 3.2: TOMAR ID DEL PRODUCTO Y MOSTRAR DETALES DEL MISMO.

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
        comentario_cliente += `<div>
            <strong>${comentario.user} -</strong> ${stars(comentario.score)}<br>
            - ${comentario.dateTime} -  <br>
            ${comentario.description}
            </div>`;


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
    if ('nombreUsuario' in localStorage) {

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
            <input type="button" value="Comentar" id="btn_comentar">

      <fieldset>
      </form>`;
    } else {
        comentario_usuario = '<p><a href="index.html">Inicie sesión</a> para comentar el producto.</p>'
    }
    document.getElementById('caja_de_comentario').innerHTML = comentario_usuario;
}

/* ....................................................................................................... */


function usuario_puntaje() {
    let green_stars = document.getElementById('estrellas_usuario');     // Calificar usando las estrellas en la caja de comentario.    
    green_stars.addEventListener('click', (e) => {

        if (e.target.tagName === 'SPAN') {
            green_stars.innerHTML = stars(e.target.id);
            calificacion_usuario = e.target.id;
        }
    })
}


/* ....................................................................................................... */


function usuario_comentar() {       // ENTREGABLE 3: DESAFÍO: 
    let btn_comentar = document.getElementById('btn_comentar');
    let user_comentario = [];
    usuario_puntaje();

    btn_comentar.addEventListener('click', () => {
        let current = new Date();


        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
        let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        let dateTime = cDate + ' ' + cTime;
        console.log('Día/Hora:' + dateTime);

        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // CORREGIR ESTA PARTE DEL CODIGO CON TUS PALABRAS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        // Si calificación_usuario = undefined, mostrar mensaje para que se seleccione una puntucación.
        // si no ha seleccionado puntaje, no mostrar estrellas.

        let texto_comentario = document.getElementById("comentario_user");

        if (texto_comentario.value != '') {
            let user_comment = {
                dateTime: dateTime,
                description: texto_comentario.value,
                product: id_producto,
                score: calificacion_usuario,
                user: localStorage.getItem("nombreUsuario")
            };

            user_comentario.push(user_comment);
            console.log(user_comentario);


            total_comentarios([user_comment]);
            texto_comentario.value = "";

            let recuperar = JSON.stringify(user_comentario);            
            localStorage.setItem('comentarios_' + id_producto, recuperar);
            
            
        } else {
            console.log('Debe ingresar un texto para poder comentar.');
        }

    })
}


/* ....................................................................................................... */

function recuperar_comentarios() {      // // ENTREGABLE 3: DESAFÍO - Mostrar comentarios recuperados del local storage.
    if(localStorage.getItem('comentarios_' + id_producto)){
        let comentarios_recuperados = JSON.parse(localStorage.getItem('comentarios_' + id_producto));
        console.log('comentarios_recuperados:' + comentarios_recuperados);
        total_comentarios(comentarios_recuperados); 
    }
}

/* ....................................................................................................... */



if (!('producto_id' in localStorage)) {      // Si se intenta entrar directamente a product-info.html sin que haya id_producto guardado, redirige a categories.html
    window.location = 'categories.html';
}




fetch(PRODUCT_INFO_URL + id_producto + '.json')     // INICIO DE EJECUCIÓN!
    .then(response => response.json())
    .then(info => {
        productoInfo(info);

        fetch(PRODUCT_INFO_COMMENTS_URL + id_producto + '.json')
            .then(response => response.json())
            .then(comentarios => {
                total_comentarios(comentarios);
                recuperar_comentarios();


            })
            .catch(error => {
                alert(error)
            });

        caja_de_comentario();
        usuario_comentar();
    })
    .catch(error => {
        alert(error)
    });