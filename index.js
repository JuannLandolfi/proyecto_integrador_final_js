//Productos en Arrays

const productosArray = [
    {
        id: "monitor-gdr",
        titulo: "Monitor GDR",
        imagen: "./multimedia/img_monitor1.jpg",
        categoria: {
            nombre: "Monitores",
            id: "monitores"
        },
        precio: 56000,
    },

    {
        id: "teclado-gammer",
        titulo: "Teclado Gammer",
        imagen: "./multimedia/img_teclado1.jpg",
        categoria: { 
            nombre: "Teclados",
            id: "teclados"
        },
        precio: 48500,
    },

    {
        id: "mouse-u2",
        titulo: "Mouse U2",
        imagen: "./multimedia/img_mouse1.jpg",
        categoria: {
            nombre: "Mouses",
            id: "mouses"
    },
    precio: 22700,
},

{
    id: "monitor-dd",
    titulo: "Monitor DD",
    imagen: "./multimedia/img_monitor2.jpg",
    categoria: { 
        nombre: "Monitores",
        id: "monitores",
},
    precio: 61000,
},
];




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
        </div>
        `;

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





