const btn_cambios = document.getElementById("guardar_cambios");
let nombre1 = document.getElementById("primer_nombre");
let nombre2 = document.getElementById("segundo_nombre");
let apellido1 = document.getElementById("primer_apellido");
let apellido2 = document.getElementById("segundo_apellido");
let telefono = document.getElementById("telefono");
let foto = document.getElementById("foto_perfil");
let feedback = document.getElementById("feedback");
let datosPerfil;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("usuario").value = localStorage.getItem("nombreUsuario");

    if (localStorage.getItem("datosPerfil")) {
        datosPerfil = JSON.parse(localStorage.getItem("datosPerfil"));

        nombre1.value = datosPerfil[0];
        nombre2.value = datosPerfil[1];
        apellido1.value = datosPerfil[2];
        apellido2.value = datosPerfil[3];
        telefono.value = datosPerfil[4];
        foto.value = datosPerfil[5];
    }

    btn_cambios.addEventListener("click", () => {

        if ((nombre1.value && apellido1.value) != "") {
            datosPerfil = [nombre1.value, nombre2.value, apellido1.value, apellido2.value, telefono.value, foto.value];
            console.log("datos nuevos")
            console.log(datosPerfil);
            feedback.innerHTML = '<p style="color: green">Datos guardados con éxito.</p>'
            localStorage.setItem("datosPerfil", JSON.stringify(datosPerfil));

        } else {
            feedback.innerHTML = '<p style="color: red">Debe ingresar primer nombre y primer apellido.</p>'
        }

    })

})