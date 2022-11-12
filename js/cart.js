const USER_ID = 25801;
const USD = 42.1;
let articulo;
let subtotal_gral = 0;
let envio_tipo = document.getElementsByName("tipo_de_envio");

/* ....................................................................................................... */

function recuperarCompra(peugeot208) {
    let productos_carrito = JSON.parse(localStorage.getItem("productos_por_comprar")) || [];

    productos_carrito.unshift(peugeot208);

    for (const prod of productos_carrito) {
        prod.subtotal = prod.count * prod.unitCost;
    }

    productosEnCarrito(productos_carrito);
}

function productosEnCarrito(a_comprar) {         // E5.1 - TABLA PARA MOSTRAR INFO DE CADA PRODUCTO AÑADIDO
    let newProduct;
    let tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < a_comprar.length; i++) {

        newProduct = `<tr class="row text-center">
            <td class="col-3"><img class="img-carrito" src="${a_comprar[i].image}" alt="${a_comprar[i].name}"</td>
           <td class="col-3">${a_comprar[i].name}</td>
           <td class="col-2">${a_comprar[i].currency} ${a_comprar[i].unitCost}</td>
           <td class="col-2"><input type="number" class="input_number col-6" name="cantidad" id="${i}" value="1"></td>
           <td class="col-2" id="subtotal-${i}"> ${a_comprar[i].currency} ${a_comprar[i].subtotal}</td>
         </tr>`;

        tbody.innerHTML += newProduct;
    }
    manipularSubtotal(a_comprar);
}

function manipularSubtotal(mis_productos) {        // E5.3 - MODIFICAR SUBTOTAL EN TIEMPO REAL
    let input_number = document.getElementsByClassName("input_number");

    for (let i = 0; i < input_number.length; i++) {
        subtotal_prod = input_number[i].value * mis_productos[i].unitCost;

        input_number[i].addEventListener("input", () => {
            let subtotal_html = document.getElementById(`subtotal-${i}`);
            
            let a = input_number[i].value;
            let b = 0;
            subtotal_html.innerHTML = "";
            subtotal_html.innerHTML += `${mis_productos[i].currency} ${input_number[i].value * mis_productos[i].unitCost}`;
        
            if (mis_productos[i].currency === "UYU") {
                subtotal_prod /= USD;
            }

            if (a > b) {
                subtotal_gral += mis_productos[i].unitCost;
                b = a;
                costos();
            }  else {
                subtotal_gral -= mis_productos[i].unitCost * input_number[i].value;
                b = a;
                costos();
            }
        })

        if (mis_productos[i].currency === "UYU") {
            subtotal_prod /= USD;
        }
        subtotal_gral += subtotal_prod;
    }

    costos();
    tipoEnvio();
}

function tipoEnvio() {
    let valor_envio;
    for (let i = 0; i < envio_tipo.length; i++) {

        envio_tipo[i].addEventListener("click", () => {
            valor_envio = envio_tipo[i].value;
            costos(valor_envio);
        })
    }

}

function costos(valor_envio) {
    let subtotal = document.getElementById("montoSubtotal");
    let envio = document.getElementById("costoEnvio");
    let precio_final = document.getElementById("montoFinal");
    let costo_envio;

    if (valor_envio === undefined) {
        valor_envio = 5;
    }

    subtotal_gral = Math.round(subtotal_gral);
    costo_envio = Math.round(subtotal_gral * valor_envio / 100);

    subtotal.innerHTML = subtotal_gral;
    envio.innerHTML = costo_envio;
    precio_final.innerHTML = subtotal_gral + costo_envio;
}

/* ....................................................................................................... */

fetch(CART_INFO_URL + USER_ID + EXT_TYPE)
    .then(response => response.json())
    .then(data => {
        data = data.articles[0];
        recuperarCompra(data);
    })
    .catch(error => console.log(error));

let opciones_pago = document.getElementsByName("forma_de_pago");
let t_credito = document.getElementsByClassName("t_credito");
let nro_cuenta = document.getElementById("nro_cuenta");
let metodo_pago;

nro_cuenta.disabled = true;

for (let i = 0; i < opciones_pago.length; i++) {
    opciones_pago[i].addEventListener("click", () => {
        metodo_pago = opciones_pago[i].value;

        switch (metodo_pago) {
            case "t_credito":
                nro_cuenta.disabled = true;
                for (input of t_credito) {
                    input.disabled = false;
                }
                break;

            case "t_bancaria":
                nro_cuenta.disabled = false;
                for (input of t_credito) {
                    input.disabled = true;
                }
                break;
        }

    })

}

let formulario = document.getElementById("formulario_carrito");
formulario.addEventListener("submit", (event) => {
    let nro_tarjeta = document.getElementById("nro_tarjeta");
    let cod_seguridad = document.getElementById("cod_seguridad");
    let vencimiento = document.getElementById("vencimiento");
    let nro_cuenta = document.getElementById("nro_cuenta");
    
        if (formulario.checkValidity()) {
            alert("Compra realizada con exito");
            formulario.classList.add("was-validated")
            
        } else {
            alert("Deben ingresarse datos para medio de pago")
        }
    }
    
);