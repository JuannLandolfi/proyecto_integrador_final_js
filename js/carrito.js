let productosEnCarrito = localStorage.getItem("productos_en_carrito");    //traemos la informacion de localstorage//
productosEnCarrito = JSON.parse(productosEnCarrito);


const contenedorCarritoVacio = document.querySelector("#carrito_vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");    //constantes declaradas, entramos al documento HTML y las llamamos por el ID.
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-compra");
let botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
const botonVaciar = document.querySelector("#carrito_acciones_vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito_acciones_comprar");

function cargarProductosCarrito() {

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");    //Le aplicamos la clase "disabled" a las contastantes declaradas arriba.
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
    
        productosEnCarrito.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("carrito-productos");
        div.innerHTML = `<div class="carrito_producto">
        <img class="img_carrito" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="carrito_producto_nombre">
            <small class="texto_carrito">Nombre</small>
            <h3 class="texto_carrito">${producto.titulo}</h3>
        </div>
        <div class="carrito_producto_cantidad">
            <small class="texto_carrito">Cantidad</small>
            <p class="texto_carrito">${producto.cantidad}</p>
        </div>
            <div class="carrito_producto_precio">
                <small class="texto_carrito">Precio</small>
                <p class="texto_carrito">${producto.precio}</p>
            </div>
                <div class="carrito_producto_subtotal">
                    <small class="texto_carrito">Subtotal</small>
                    <p class="texto_carrito">${producto.precio * producto.cantidad}</p>
                </div>
            <button class="carrito_producto_eliminar" id="${producto.id}"><i class="bi bi-trash3"></i></button>
                </div>"`
    
    
        contenedorCarritoProductos.append(div);
    
        })
    
    
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");    //Y sino, hacemos que el carrito este vacio y muestre el mensaje, eliminandole la clase "disabled"
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }
    

    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosCarrito();           //carga todos los productos que estan en el localstorage


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito_producto_eliminar");
    
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarProductosCarrito();       

    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}


botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();       

}

function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");    
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");


}
