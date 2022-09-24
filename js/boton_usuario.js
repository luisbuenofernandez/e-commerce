/*      ¡ESTE ARCHIVO JAVASCRIPT ESTÁ ENLAZADO A TODOS LOS HTML QUE DEBEN MOSTRAR EL BOTÓN DE USUARIO!       */

// ENTREGA 4.2 - MENÚ DESPLEGABLE EN NOMBRE DE USUARIO
let usuario = localStorage.getItem("nombreUsuario");
const boton_usuario = document.getElementById("nombre_de_usuario");
const cerrar_sesion = document.getElementById("borrar_usuario");

const dropdown = `<div class="dropdown">
  <a class="nav-link" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
  ${usuario}
  </a>

  <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
    <li><a class="dropdown-item" href="my-profile.html">${usuario}</a></li>
    <li><a class="dropdown-item" href="cart.html">Carrito</a></li>
    <li><a class="dropdown-item" href="index.html">Cerrar Sesión</a></li>
  </ul>
</div>`;

boton_usuario.innerHTML = dropdown;
