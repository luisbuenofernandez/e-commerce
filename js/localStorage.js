/*      ¡ESTE ARCHIVO JAVASCRIPT ESTÁ ENLAZADO A TODOS LOS HTML QUE DEBEN MOSTRAR EL BOTÓN DE USUARIO!       */

let usuario = localStorage.getItem('nombreUsuario');
let boton_usuario = document.getElementById("nombre_de_usuario");

boton_usuario.innerHTML = `<a href='my-profile.html' class="nav-link">${usuario}</a>`;