let datos_producto = document.getElementById('datos_producto');
let id_producto = localStorage.getItem('producto_id');
let producto_a_agregar = '';
let otros_usuarios = document.getElementById('otros_usuarios');

/* ....................................................................................................... */

function productoInfo(info) {   // ENTREGA 3.2: TOMAR ID DEL PRODUCTO Y MOSTRAR DETALES DEL MISMO.

    producto_a_agregar = `        
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

    datos_producto.innerHTML += producto_a_agregar;
}

/* ....................................................................................................... */

function comentarios() {     // ENTREGA 3.3: TRAER Y MOSTRAAR COMENTARIOS DEL PRODUCTO.

    fetch(PRODUCT_INFO_COMMENTS_URL + id_producto + '.json')
        .then(response => response.json())
        .then(comentarios => {

            producto_a_agregar = `
            <h5>Comentarios</h5>
            </div> `;

            for (let comentario of comentarios) {
                producto_a_agregar += `<div class='otros_usuarios'>
            <strong>${comentario.user}</strong> - ${comentario.dateTime} -  ${stars(comentario.score)}<br>
            ${comentario.description}
            </div>`;

            }

            otros_usuarios.innerHTML += producto_a_agregar;
        })
        .catch(error => alert(error));
}

/* ....................................................................................................... */

function stars(puntos) {     // CALIFICACIÓN DEL PRODUCTO CON ESTRELLAS.
    let score = '';

    for (i = 1; i <= 5; i++) {

        if (i <= puntos) {
            score += '<span class="fa fa-star checked"></span>';
        } else {
            score += '<span class="fa fa-star"></span>'
        }
    }

    return score;
}

/* ....................................................................................................... */

function caja_de_comentario() {     // SI USER EN LOCALSTORAGE, MOSTRAR CAJA DE COMENTARIOS.
    let comentario_usuario;

    if ('nombreUsuario' in localStorage) {
        comentario_usuario = `
      <form action=""  id="">
      <fieldset>
        <legend>
          <h5>${usuario}</h5> - ${stars(4)}<br>
        </legend> 
        
            <textarea class="comentario" id="mi_comentario" placeholder="Ingrese el texto deseado..."></textarea>
            <input type="button" value="Comentar" id="btn_comentar">

      <fieldset>
      </form>`;



    } else {
        comentario_usuario = '<p><a href="index.html">Inicie sesión</a> para comentar el producto.</p>'
    }
    document.getElementById('caja_de_comentario').innerHTML = comentario_usuario;
}

/* ....................................................................................................... */

function mi_comentario(usuario, estrellas, hora, fecha) {       // ENTREGABLE 3: DESAFÍO.
    let btn_comentar = document.getElementById('btn_comentar');
    let texto = document.getElementById("mi_comentario");
    btn_comentar.addEventListener('click', () => {

        console.log(`nombreUsuario: ${usuario} - estrellas: ${estrellas} - hora: ${hora} - fecha: ${fecha}`);

        producto_a_agregar = `<div class='otros_usuarios'>
            <strong>${usuario}</strong> - ${hora} - ${fecha}  -  ${stars(estrellas)}<br>
            <p>${texto.value}</p>
            </div>`;

        texto.value = "";
        otros_usuarios.innerHTML += producto_a_agregar;
    })
}

/* ....................................................................................................... */

if (!('producto_id' in localStorage)) {      // Si se intenta entrar directamente a product-info.html sin que haya id_producto guardado, redirige a categories.html
    window.location = 'categories.html';
}

/* ....................................................................................................... */

fetch(PRODUCT_INFO_URL + id_producto + '.json')     // INICIO DE EJECUCIÓN!
    .then(response => response.json())
    .then(info => {
        productoInfo(info);
        comentarios();
        caja_de_comentario();
        mi_comentario(usuario, 4, 17.50, 11.09);
    })
    .catch(error => alert(error));