let autos_json = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let div_id_tabla = document.getElementById("tabla");

function mostrarAutos(autos_array) {
	console.log(autos_array);

	let contenido_a_agregar = ``;

	for (const auto of autos_array) {
		contenido_a_agregar = `<div>
        
        <img src=" ${auto.image}" alt="${auto.name}" >
        <h2> ${auto.name}</h2> 
        <h4> ${auto.currency} ${auto.cost}</h4>
        <p> ${auto.description}</p>
        <small> ${auto.soldCount} vendidos. </small>
        <hr>
       
        </div>`;
       
       div_id_tabla.innerHTML += contenido_a_agregar;
	}
}

let autos = [];

document.addEventListener("DOMContentLoaded", function () {
	fetch(autos_json)
		.then((respuesta) => respuesta.json())
		.then((datos) => {

			autos = datos.products;
			mostrarAutos(autos);
		});
});
