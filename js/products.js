let cat_Id = localStorage.getItem("catID");
let productos_url = "https://japceibal.github.io/emercado-api/cats_products/" + cat_Id + ".json";
let espacio_en_html = document.getElementById("productos");
let productos_array = [];

const boton_rel = document.getElementById('sortByCount');
const boton_asc = document.getElementById('sortAsc');
const boton_desc = document.getElementById('sortDesc');


function mostrarProductos(productos_array) {
	datosProductos(productos_array);

	boton_asc.addEventListener('click', function () {
		productos_array.sort((a, b) => {
			return a.cost - b.cost;
		})
		espacio_en_html.innerHTML = '';
		datosProductos(productos_array);
	});

	boton_desc.addEventListener('click', function () {
		productos_array.sort((a, b) => {
			return b.cost - a.cost;
		})
		espacio_en_html.innerHTML = '';
		datosProductos(productos_array);
	});

	boton_rel.addEventListener('click', function () {
		productos_array.sort((a, b) => {
			return b.soldCount - a.soldCount;
		})
		espacio_en_html.innerHTML = '';
		datosProductos(productos_array);
	});
}


function datosProductos(productos_array) {

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



document.addEventListener("DOMContentLoaded", function () {

	fetch(productos_url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			productos_array = datos.products;
			mostrarProductos(productos_array)
		})
		.catch(error => alert(error));
});


