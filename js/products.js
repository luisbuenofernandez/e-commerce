let cat_Id = localStorage.getItem("catID");
let productos_url = "https://japceibal.github.io/emercado-api/cats_products/" + cat_Id + ".json";
let espacio_en_html = document.getElementById("productos");
let productos_array = [];

function mostrarProducto(productos_array) {

	let producto_a_agregar = ``;

	for (const elemento of productos_array) {
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


document.addEventListener("DOMContentLoaded", function () {
	fetch(productos_url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			productos_array = datos.products;
			mostrarProducto(productos_array);
		})
		.catch(error => alert(error));
});
