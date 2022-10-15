const USER_ID = 25801;
let articulo;

function recuperarCompra(peugeot208) {
    let productos_carrito = [];

    if (localStorage.getItem("productos_por_comprar")) {
        productos_carrito = JSON.parse(localStorage.getItem("productos_por_comprar"));
    }

    productos_carrito.unshift(peugeot208);

    for (const prod of productos_carrito) {
        prod.subtotal = prod.count * prod.unitCost;
    }

    productosEnCarrito(productos_carrito);
}

function productosEnCarrito(a_comprar) {         // ENTREGA 5.1 - 
    let tbody = document.getElementById("tbody");
    let newProduct;

    tbody.innerHTML = "";

    for (let i = 0; i < a_comprar.length; i++) {

        newProduct = `<tr class="row">
            <td class="col-sm-1"></td>
            <th class="col-sm"><img class="img-carrito" src="${a_comprar[i].image}" alt="${a_comprar[i].name}"</th>
           <td class="col-sm">${a_comprar[i].name}</td>
           <td class="col-sm">${a_comprar[i].currency} ${a_comprar[i].unitCost}</td>
           <td class="col-sm"><input type="number" class="input_number col-6" name="cantidad" id="${i}" value="1"></td>
           <td class="col-sm" id="subtotal-${i}"> ${a_comprar[i].currency} ${a_comprar[i].subtotal}</td>
           <td class="col-sm-1"></td>
         </tr>`;

        tbody.innerHTML += newProduct;

    }

    manipularSubtotal(a_comprar);
}

function manipularSubtotal(mis_productos) {        // ENTREGA 5.3 - MODIFICAR SUBTOTAL EN TIEMPO REAL
    let input_number = document.getElementsByClassName("input_number");

    for (let i = 0; i < input_number.length; i++) {

        input_number[i].addEventListener("input", () => {
            console.log(i)
            let subtotal = document.getElementById(`subtotal-${i}`);
            subtotal.innerHTML = "";
            subtotal.innerHTML += `${mis_productos[i].currency} ${input_number[i].value * mis_productos[i].unitCost}`;
        })
    }
}

fetch(CART_INFO_URL + USER_ID + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
        data = data.articles[0];
        recuperarCompra(data)
    })
    .catch(error => console.log(error));