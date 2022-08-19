let boton = document.getElementById("entrar");
let error = document.getElementById("error"); 

boton.addEventListener("click", function () {       
    // La funcion se ejecuta si es pulsado el boton de iniciar sesión
    
		let campos_requeridos = document.getElementsByClassName("datos"); //Toma lo que haya en los campos
        
        let usuario = campos_requeridos[0].value;
        let contrasenia = campos_requeridos[1].value;

		if ((usuario.length && contrasenia.length) > 0) {  // Si el largo de los datos ingresados es mayor a 0, entonces continua
			location.href = "portada.html";      // Readirecciona al usuario a portada.html 
            alert("¡Bienvenido/a a eMercado!");
        
        } else{ // Mostrar en rojo los campos que faltan completar

            if (usuario.length === 0 && contrasenia.length === 0){ 
                error.innerHTML = `<p>Ingrese su usuario y contraseña.</p>`;
            } else if (contrasenia.length === 0){             
                error.innerHTML = `<p>Ingrese su contraseña.</p>`;
            } else{ 
                error.innerHTML = `<p>Ingrese su usuario.</p>`;
            }
        }
    });