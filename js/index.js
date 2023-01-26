let contenedorProductos = document.getElementById("contenedor-productos");

let contenedorCarrito = document.getElementById("carrito-contenedor");

let botonVaciar = document.getElementById("vaciar-carrito");

let contadorCarrito = document.getElementById("contadorCarrito");
let contenedorInicio = document.getElementById("contenedor-inicio");
let carritoContenedor = document.getElementById("contenedor-carrito");
let contenedorTienda = document.getElementById("contenedor-tienda");

let cantidad = document.getElementById("cantidad");
let precioTotal = document.getElementById("precioTotal");
let cantidadTotal = document.getElementById("cantidadTotal");
let precioAPagar = 0;
let carrito = [];

const jsonTiendaPath = "./js/tienda.json";
let articulosJson;

window.onload = function () {
  //Cuando se cargue la pagina

  fetch(jsonTiendaPath) //Obtenemos el json con la infomracion de la tienda
    .then((Response) => Response.json())
    .then((data) => {
      articulosJson = data["productos"];

      createList(articulosJson);
    })
    .catch(() => {
      alert("¡Lo sentimos! Ha ocurrido un error. Por favor contactese con el administrador para más información.");
    });
};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito();
  }
});
let createList = (listCreate) => {
  listCreate.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
  <img src=${producto.img} alt= "">
  <p>ID: ${producto.id}</p>
  <h3>${producto.nombre}</h3>
  <p class="precioProducto">Precio: $${producto.precio}</p>
  <button id="oferta${producto.id}" class="boton-card">ver descuento</button>
  <button id="agregarAlCarrito${producto.id}" class="boton-card">Agregar al Carrito</button>
  `;

    contenedorProductos.appendChild(div);
    const botonOferta = document.getElementById(`oferta${producto.id}`);

    contenedorProductos.appendChild(div);
    const botonAgregar = document.getElementById(`agregarAlCarrito${producto.id}`);
    //Por cada elemento de mi array, creo un div

    botonOferta.addEventListener("click", () => {
      //esta funcion ejecuta que muestre si hay oferta
      mostrarOferta(producto.id);
    });
    botonAgregar.addEventListener("click", () => {
      //esta funcion ejecuta que agregue el producto al carrito
      agregarAlCarrito(producto.id);
    });
  });
};
// createList(productos);

let navInicio = document.getElementById("nav-inicio");
navInicio.addEventListener("click", () => {
  contenedorInicio.classList.remove("hidden");
  contenedorTienda.classList.add("hidden");
  carritoContenedor.classList.add("hidden");
  localStorage.setItem("page-set", "home");
});
let navProductos = document.getElementById("nav-productos");
navProductos.addEventListener("click", () => {
  contenedorTienda.classList.remove("hidden");
  carritoContenedor.classList.add("hidden");
  contenedorInicio.classList.add("hidden");
  localStorage.setItem("page-set", "tienda");
});

let navCarrito = document.getElementById("nav-carrito");
navCarrito.addEventListener("click", () => {
  carritoContenedor.classList.remove("hidden");
  contenedorTienda.classList.add("hidden");
  contenedorInicio.classList.add("hidden");
  localStorage.setItem("page-set", "carrito");
});

if (localStorage.getItem("page-set") === "tienda") {
  contenedorTienda.classList.remove("hidden");
  carritoContenedor.classList.toggle("hidden");
  contenedorInicio.classList.toggle("hidden");
} else if (localStorage.getItem("page-set") === "carrito") {
  carritoContenedor.classList.remove("hidden");
  contenedorTienda.classList.toggle("hidden");
  contenedorInicio.classList.toggle("hidden");
} else {
  contenedorInicio.classList.remove("hidden");
  contenedorTienda.classList.toggle("hidden");
  carritoContenedor.classList.toggle("hidden");
}

//ordenar de A a Z
let ordenMenor = document.getElementById("orden-menor");
ordenMenor.addEventListener("click", () => {
  const consulta = articulosJson.sort((a, b) => {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return -1;
    }
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  cleanStock();
  createList(consulta);
});

//ordenar de Z a A
let ordenMayor = document.getElementById("orden-mayor");
ordenMayor.addEventListener("click", () => {
  lowerOrder(articulosJson);
});

let lowerOrder = (product) => {
  const consulta = product.sort((a, b) => {
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
      return -1;
    }
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  cleanStock();
  createList(consulta);
};

//borrar contenedor de productos
let cleanStock = () => {
  contenedorProductos.innerHTML = "";
};

//muestra el descuento.
let mostrarOferta = (prodId) => {
  let item = articulosJson.find((producto) => producto.id === prodId);
  if (item.oferta) {
    alert("El precio es $" + item.precio + " pero tiene un descuento y su precio final es $" + item.precio * 0.8);
  } else {
    alert("El precio final $" + item.precio + " este articulo no tiene descuento");
  }
};

//Busqueda de producto por nombre
let buscarProducto = document.getElementById("buscar-producto");
buscarProducto.addEventListener("click", () => {
  let prodBuscar = prompt("Ingrese nombre del producto a buscar");
  filtar(prodBuscar.toLocaleLowerCase());
});
//Filtar producto
const filtar = (prodBuscar) => {
  let list = [];
  for (let producto of articulosJson) {
    let nombre = producto.nombre.toLowerCase();
    if (nombre.indexOf(prodBuscar) !== -1) {
      list.push(producto);
    }
  }
  cleanStock();
  createList(list);
};

//Agregar al carrito
const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    const item = articulosJson.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito();
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item);

  carrito.splice(indice, 1);
  actualizarCarrito();
};

const calPrecio = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);
  let precio;
  if (item.oferta) {
    precio = item.precio * 0.8;
  } else {
    precio = item.precio;
  }
  return precio;
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  //Por cada producto creamos un div
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "producto-en-carrito";
    let precio;
    if (prod.oferta) {
      precio = prod.precio * 0.8;
    } else {
      precio = prod.precio;
    }
    div.innerHTML = `
      <div>
        <p>${prod.nombre}</p>
        <p>Precio:$${precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      </div>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><img src="./assets/logos/tacho.ico" alt=""></button>
      `;

    contenedorCarrito.appendChild(div);
  });

  localStorage.setItem("carrito", JSON.stringify(carrito));
  contadorCarrito.innerText = carrito.length;
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * calPrecio(prod.id), 0);
  precioAPagar = carrito.reduce((acc, prod) => acc + prod.cantidad * calPrecio(prod.id), 0);
};

botonVaciar.addEventListener("click", () => {
  carrito = [];
  actualizarCarrito();
});

//Modo Dark
let btnSwitch = document.getElementById("switch");
btnSwitch.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  btnSwitch.classList.toggle("active");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("dark-mode", "true");
  } else {
    localStorage.setItem("dark-mode", "false");
  }
});

if (localStorage.getItem("dark-mode") === "true") {
  document.body.classList.add("dark");
  btnSwitch.classList.add("active");
} else {
  document.body.classList.remove("dark");
  btnSwitch.classList.remove("active");
}

//Carrusel
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});

//modal
const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-pagar')
const botonCerrar = document.getElementById('cerrar-pago')
const botonSalir = document.getElementById('modal-cerrar')
const modalActive = document.getElementsByClassName('modal-cerrar')[0]


botonAbrir.addEventListener('click', ()=>{
  carrito = [];
  actualizarCarrito();
    contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', (event)=>{
  contenedorModal.classList.remove("modal-active");
})

botonSalir.addEventListener('click', (event)=>{
  contenedorModal.classList.toggle("modal-active");
})
contenedorModal.addEventListener('click', (event) =>{
    contenedorModal.classList.toggle('modal-active')

})