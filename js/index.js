// Declaración de un arreglo para almacenar los productos.
let productosArray = [];

// Realizar una solicitud fetch para obtener datos de un archivo JSON.
fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productosArray = data;
        cargarProductos(productosArray);
    })




const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesNav = document.querySelectorAll(".boton_nav");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto_boton");
const numerito = document.querySelector("#numerito");








function cargarProductos(productosArray) {
    contenedorProductos.innerHTML = "";

    productosArray.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <img  class="producto_imagen" src="${producto.imagen}" height="250" width="250" alt="${producto.titulo}">
        <div class="producto_detalle">
            <h3 class="producto_titulos">${producto.titulo}</h3>
            <p class="producto_precio">${producto.precio}</p>
            <button class="producto_boton" id="${producto.id}">Agregar al carrito</button>
            <button class="producto_detail" id="${producto.id}">Detalles</button>
        </div>
        `;


        
    // Agregar un controlador de eventos para mostrar detalles del producto.
    const botonDetalles = div.querySelector(".producto_detail");
    botonDetalles.addEventListener("click", () => {
        mostrarDetallesProducto(producto);
    });

     // Agregar el producto al contenedor.
        contenedorProductos.append(div);
    });

    actualizarBotonesAgregar();

}

cargarProductos(productosArray);


botonesNav.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesNav.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos"){
            const productoCategoria = productosArray.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.textContent = productoCategoria.categoria.nombre;
        const productosBoton = productosArray.filter(producto => producto.categoria.id === e.currentTarget.id);
        cargarProductos(productosBoton); 
    } else {
        tituloPrincipal.textContent = "Todos los productos";
        cargarProductos(productosArray);
    }
    });
});


 // declaré la variable arriba y no adentro de esta función porque tenía que leer la función que está justamente arriba//
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto_boton");
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}


let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos_en_carrito");


if (productosEnCarritoLS) {      
    productosEnCarrito = JSON.parse(productosEnCarritoLS);      //si hago el parse antes me tira error si viene vacio, tengo que hacerlo despues de traer algo de localstorage.                       
    actualizarNumerito();    //vuelvo a llamar esta funcion para actualizar el numero del carrito cada vez que volvemos al inicion y al carrito nuevamente.
} else {

    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productosArray.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;      //cuando agregamos dos productos con el mismo ID al array nos suma la cantidad.//

    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos_en_carrito", JSON.stringify(productosEnCarrito));
}


function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce ((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;      //hacemos que la cantidad de productos se vea reflejada en el numero asignado al carrito
}



// Función para mostrar detalles de un producto en una ventana emergente.
function mostrarDetallesProducto(producto) {
    const ventanaDetalles = window.open('', 'ventanaDetalles');
    
    ventanaDetalles.document.write(`
        <html>
        <head>
            <title>Detalles del Producto</title>
            <link rel="stylesheet" href="./css/detalles.css">
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
        </head>
        <body>
            <div class="contenedor">
                <aside>
                    <header>
                        <h1 class="logo">Landolfi</h1>
                    </header>
                    <nav>
                    <a class="boton_general boton_carrito" href="./index.html"><i class="bi bi-box-arrow-left"></i> Volver al inicio</a>
                    </nav>
                    <div class="tarjeta_detalle">
                    <h1 class="subtitulo">Detalles del producto</h1>
                    <h3 class="producto_titulo">${producto.titulo}</h3>
                    <img class="producto_imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <p>Precio: ${producto.precio}</p>
                    <p>Descripción: ${producto.detalles.descripcion}</p>
                    <p>Características:</p>
                        <ul>
                            ${producto.detalles.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
                        </ul>
                    </div>
                </aside>
            </div>
        </body>
        </html>
    `);
}





