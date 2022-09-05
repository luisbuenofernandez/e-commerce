let cat_id = localStorage.getItem("catID");
let productos_url = "https://japceibal.github.io/emercado-api/cats_products/" + cat_id + ".json";
let espacio_en_html = document.getElementById("productos");
let productos_array = [];
let lista_original = [];

const boton_rel = document.getElementById('sortByCount');
const boton_asc = document.getElementById('sortAsc');
const boton_desc = document.getElementById('sortDesc');

const filtrar = document.getElementById('rangeFilterCount');
const limpiar = document.getElementById('clearRangeFilter');

const buscador = document.getElementById('buscador');
let nombre_prod = '';
let descripcion_prod = '';

/* ....................................................................................................... */

function ordenAsc(productos_array) { 		// ORDEN ASCENDENTE DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return a.cost - b.cost;
	});
	mostrarProductos(productos_array);
};

function ordenDesc(productos_array) {		// ORDEN DESCENDENTE DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return b.cost - a.cost;
	});
	mostrarProductos(productos_array);
};

function ordenRel(productos_array) {		// ORDEN RELEVANCIA EN VENTAS DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return b.soldCount - a.soldCount;
	});
	mostrarProductos(productos_array);
};

/* ....................................................................................................... */

filtrar.addEventListener('click', function () { 	// FILTRA LOS ELEMENTOS ENTRE MIN Y MAX DE PRECIO.
	let rangoPrecio = [];
	let min = parseInt(document.getElementById('rangeFilterCountMin').value);
	let max = parseInt(document.getElementById('rangeFilterCountMax').value);

	for (let elemento = 0; elemento < lista_original.length; elemento++) {
		if (lista_original[elemento].cost >= min && lista_original[elemento].cost <= max) {
			rangoPrecio.push(lista_original[elemento]);
		};
	};
	mostrarProductos(rangoPrecio);
});

limpiar.addEventListener('click', function () {		// LIMPIA TODOS LOS CAMPOS CON TEXTO/NUMEROS Y MUESTRA EL LISTADO ORIGINAL.
	document.getElementById('rangeFilterCountMin').value = '';
	document.getElementById('rangeFilterCountMax').value = '';
	buscador.value = '';
	mostrarProductos(lista_original);
});

buscador.addEventListener('input', function () { 	// FILTRA LOS ELEMENTOS POR NOMBRE O DESCRIPCIÓN.
	mostrarProductos(productos_array);
});

/* ....................................................................................................... */

function mostrarProductos(productos_array) { 		// MOSTRAR LOS DATOS DE CADA PRODUCTO EN PANTALLA.
	espacio_en_html.innerHTML = '';
	let producto_a_agregar = ``;

	let texto = buscador.value.toLowerCase();

	for (let elemento of productos_array) {

		nombre_prod = elemento.name.toLowerCase();
		descripcion_prod = elemento.description.toLowerCase();

		if (nombre_prod.indexOf(texto) !== -1 || descripcion_prod.indexOf(texto) !== -1) {

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
	}

	boton_asc.addEventListener('click', function () {   // ORDENAR POR PRECIO ASCENDENTE.
		ordenAsc(productos_array);
	});

	boton_desc.addEventListener('click', function () {	// ORDENAR POR PRECIO DESCENDENTE.
		ordenDesc(productos_array);
	});

	boton_rel.addEventListener('click', function () {	// ORDENAR POR RELEVANCIA EN CANTIDAD DE VENDIDOS.
		ordenRel(productos_array);
	});
};

/* ....................................................................................................... */

document.addEventListener("DOMContentLoaded", function () {

	fetch(productos_url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			productos_array = datos.products;
			lista_original = productos_array;
			mostrarProductos(productos_array)
		})
		.catch(error => alert(error));
});


