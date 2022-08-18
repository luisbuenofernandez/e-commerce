let autos_json = "https://japceibal.github.io/emercado-api/cats_products/101.json";
let ul_en_index = document.getElementById("tabla");

function mostrarAutos(autos_array) {
	console.log(autos_array);

	let contenido_a_agregar = ``;

	for (const auto of autos_array) {
		contenido_a_agregar = `<div><tr><img src=" ${auto.image}" alt="${auto.name}">
       <h2> ${auto.name}</h2> 
       <small>
       Vendidos: ${auto.soldCount}
      </small>
       <h3> ${auto.currency} ${auto.cost}</h3>
       <p> ${auto.description}</p>
       </tr>
        
        </div>
        
       `;
       
		/* id": 50921,
        "name": "Chevrolet Onix Joy",
        "description": "Generación 2019, variedad de colores. Motor 1.0, ideal para ciudad.",
        "cost": 13500,
        "currency": "USD",
        "soldCount": 14,
        "image": "img/prod50921_1.jpg" */

		ul_en_index.innerHTML += contenido_a_agregar;
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
