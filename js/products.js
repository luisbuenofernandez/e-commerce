let autos_json = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let automoviles = document.getElementById("automoviles");

function mostrarAutos(autos_array) {

	let contenido_a_agregar = ``;

	for (const auto of autos_array) {
		contenido_a_agregar = `<div>
        
        <img src=" ${auto.image}" alt="${auto.name}" >
        <h2> ${auto.name}</h2> 
        <h4> ${auto.currency} ${auto.cost}</h4>
        <p> ${auto.description}</p>
        <small> ${auto.soldCount} vendidos. </small>
        </div>
		<hr>`;
       
       automoviles.innerHTML += contenido_a_agregar;
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
