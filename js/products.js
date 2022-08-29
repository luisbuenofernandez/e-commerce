let cat_Id = localStorage.getItem("catID");
let productos_url = "https://japceibal.github.io/emercado-api/cats_products/" + cat_Id + ".json";
let espacio_en_html = document.getElementById("productos");
let productos_array = [];

const boton_rel = document.getElementById('sortByCount');
const boton_asc = document.getElementById('sortAsc');
const boton_desc = document.getElementById('sortDesc');

let min = document.getElementById('rangeFilterCountMin');
let max = document.getElementById('rangeFilterCountMax');
let rangoPrecio = [];
const filtrar = document.getElementById('rangeFilterCount');
const limpiar = document.getElementById('clearRangeFilter');


/* ....................................................................................................... */

function mostrarProductos(productos_array) {
	datosProductos(productos_array);

	boton_asc.addEventListener('click', function () {   // ORDENAR POR PRECIO ASCENDENTE
		productos_array.sort((a, b) => {
			return a.cost - b.cost;
		})
		datosProductos(productos_array);
	});

	boton_desc.addEventListener('click', function () {	// ORDENAR POR PRECIO DESCENDENTE
		productos_array.sort((a, b) => {
			return b.cost - a.cost;
		})
		datosProductos(productos_array);
	});

	boton_rel.addEventListener('click', function () {	// ORDENAR POR RELEVANCIA EN CANTIDAD DE VENDIDOS
		productos_array.sort((a, b) => {
			return b.soldCount - a.soldCount;
		})
		datosProductos(productos_array);
	});

	filtrar.addEventListener('click', function () { 	// FILTRA LOS ELEMENTOS ENTRE MIN Y MAX DE PRECIO.
		min = min.value;
		max = max.value;

		for (let elemento of productos_array) {
			if (elemento.cost >= min && elemento.cost <= max) {
				rangoPrecio.push(elemento);
			}
		}
			console.log(rangoPrecio);
			datosProductos(rangoPrecio);

	});

	limpiar.addEventListener('click', function () {
		datosProductos(productos_array);
	});



};

		/* ....................................................................................................... */

		function datosProductos(productos_array) { 		// MOSTRAR LOS PRODUCTOS PANTALLA
			espacio_en_html.innerHTML = '';
			let producto_a_agregar = ``;

			for (let elemento of productos_array) {
				producto_a_agregar = `<div>
        
        <img src=" ${elemento.image}" alt="${elemento.name}" >
        <h2> ${elemento.name}</h2> 
        <h4> ${elemento.currency} ${elemento.cost}</h4>
        <p> ${elemento.description}</p>
        <small> ${elemento.soldCount} vendidos. </small>
        </div>
		<hr>`;

				espacio_en_html.innerHTML += producto_a_agregar;
			}
		};

		/* ....................................................................................................... */

		document.addEventListener("DOMContentLoaded", function () {

			fetch(productos_url)
				.then((respuesta) => respuesta.json())
				.then((datos) => {
					productos_array = datos.products;
					mostrarProductos(productos_array)
				})
				.catch(error => alert(error));
		});


