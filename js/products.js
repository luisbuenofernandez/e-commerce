let cat_Id = localStorage.getItem("catID");
let productos_url = "https://japceibal.github.io/emercado-api/cats_products/" + cat_Id + ".json";
let espacio_en_html = document.getElementById("productos");
let productos_array = [];

const boton_rel = document.getElementById('sortByCount');
const boton_asc = document.getElementById('sortAsc');
const boton_desc = document.getElementById('sortDesc');

const filtrar = document.getElementById('rangeFilterCount');
const limpiar = document.getElementById('clearRangeFilter');
let lista_original = [];

/* ....................................................................................................... */

function ordenAsc(productos_array) { 		// ORDEN ASCENDENTE DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return a.cost - b.cost;
	});
	/* console.log('Fallo ascendencia'); */

	datosProductos(productos_array);

};

function ordenDesc(productos_array) {		// ORDEN DESCENDENTE DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return b.cost - a.cost;
	});
	/* console.log('Fallo descendencia'); */

	datosProductos(productos_array);
};

function ordenRel(productos_array) {		// ORDEN RELEVANCIA EN VENTAS DE LOS ELEMENTOS A MOSTRAR.
	productos_array.sort((a, b) => {
		return b.soldCount - a.soldCount;
	});
	/* console.log('Fallo relevanica'); */

	datosProductos(productos_array);
};

/* ....................................................................................................... */


function mostrarProductos(productos_array) {
	datosProductos(productos_array);
	

	/* boton_asc.addEventListener('click', function () {   // ORDENAR POR PRECIO ASCENDENTE.
		ordenAsc(productos_array);
	});

	boton_desc.addEventListener('click', function () {	// ORDENAR POR PRECIO DESCENDENTE.
		ordenDesc(productos_array);
	});

	boton_rel.addEventListener('click', function () {	// ORDENAR POR RELEVANCIA EN CANTIDAD DE VENDIDOS.
		ordenRel(productos_array);
	}); */

	filtrar.addEventListener('click', function () { 	// FILTRA LOS ELEMENTOS ENTRE MIN Y MAX DE PRECIO.
		let rangoPrecio = [];
		let min = document.getElementById('rangeFilterCountMin').value;
		let max = document.getElementById('rangeFilterCountMax').value;
	
		for (let elemento = 0; elemento < lista_original.length; elemento++) {
			if (lista_original[elemento].cost >= min && lista_original[elemento].cost <= max) {
				rangoPrecio.push(lista_original[elemento]);
			};
		};
		mostrarProductos(rangoPrecio);	});

	limpiar.addEventListener('click', function () {
		document.getElementById('rangeFilterCountMin').value = '';
		document.getElementById('rangeFilterCountMax').value = '';
		mostrarProductos(lista_original);
	});
};

/* ....................................................................................................... */

function datosProductos(productos_array) { 		// MOSTRAR LOS DATOS DE CADA PRODUCTO EN PANTALLA.
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


