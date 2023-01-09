let contenedorProductos = document.getElementById("contenedor-productos");

const contenedorCarrito = document.getElementById("carrito-contenedor");

const botonVaciar = document.getElementById("vaciar-carrito");

const contadorCarrito = document.getElementById("contadorCarrito");

const cantidad = document.getElementById("cantidad");
const precioTotal = document.getElementById("precioTotal");
const cantidadTotal = document.getElementById("cantidadTotal");

let carrito = [];

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
      console.log("apreto boton");
      agregarAlCarrito(producto.id);
    });
  });
};
createList(productos);

//ordenar de A a Z
let ordenMenor = document.getElementById("orden-menor");
ordenMenor.addEventListener("click", () => {
  const consulta = productos.sort((a, b) => {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return -1;
    }
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  console.log(consulta);
  cleanStock();
  createList(consulta);
});

//ordenar de Z a A
let ordenMayor = document.getElementById("orden-mayor");
ordenMayor.addEventListener("click", () => {
  lowerOrder(productos);
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
  console.log(consulta);
  cleanStock();
  createList(consulta);
};

//borrar contenedor de productos
let cleanStock = () => {
  contenedorProductos.innerHTML = "";
};

//muestra el descuento.
let mostrarOferta = (prodId) => {
  let item = productos.find((producto) => producto.id === prodId);
  if (item.oferta) {
    alert("El precio es $" + item.precio + " pero tiene un descuento y su precio final es $" + item.precio * 0.8);
  } else {
    alert("El precio final $" + item.precio + " este articulo no tiene descuento");
  }
};

//Busqueda de producto por id
let buscarProducto = document.getElementById("nav-search");
buscarProducto.addEventListener("click", () => {
  let prodId = prompt("Ingrese ID del producto");
  buscador(prodId);
});

let buscador = (prodId) => {
  let item = productos.find((producto) => producto.id == prodId);
  if (item && item.id) {
    alert("El producto buscado es: " + item.nombre + " y su precio es= $" + item.precio);
  } else {
    alert("El producto buscado no existo");
  }
};

function actulizarSearchInput() {
  const inputSearch = document.getElementById("nav__search");

  if (localStorage.getItem("wordToSearch")) {
    //guarda la palabra en el localstorage
    inputSearch.value = localStorage.getItem("wordToSearch");
  }
  return;
}

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {
  const existe = carrito.some((prod) => prod.id === prodId); //comprobar si el elemento ya existe en el carro

  if (existe) {
    //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
    const prod = carrito.map((prod) => {
      if (prod.id === prodId) {
        prod.cantidad++;
      }
    });
  } else {
    //EN CASO DE QUE NO ESTÉ, AGREGAMOS EL CURSO AL CARRITO
    const item = productos.find((prod) => prod.id === prodId);
    carrito.push(item);
  }
  actualizarCarrito(); //MODIFICA EL CARRITO
};

const eliminarDelCarrito = (prodId) => {
  const item = carrito.find((prod) => prod.id === prodId);

  const indice = carrito.indexOf(item); //Busca el elemento q yo le pase y nos devuelve su indice.

  carrito.splice(indice, 1);
  actualizarCarrito();
  console.log(carrito);
};

const actualizarCarrito = () => {
  contenedorCarrito.innerHTML = "";

  //Por cada producto creamos un div
  carrito.forEach((prod) => {
    const div = document.createElement("div");
    div.className = "productoEnCarrito";
    div.innerHTML = `
      <p>${prod.nombre}</p>
      <p>Precio:$${prod.precio}</p>
      <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
      <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
      `;

    contenedorCarrito.appendChild(div);

    localStorage.setItem("carrito", JSON.stringify(carrito));
  });

  contadorCarrito.innerText = carrito.length;
  console.log(carrito);
  precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);
};

botonVaciar.addEventListener("click", () => {
  carrito.length = 0;
  actualizarCarrito();
});

// Codigo anterior, lo borrare para la entrega final.

// let userLocal = "luciano@gmail.com";
// let passwordLocal = "abc";

// function login() {
//   let name = prompt("Ingresar tu nombre");
//   let user = prompt("Ingresa tu usuario");
//   let password = prompt("Ingresa tu contraseña");
//   validarUsuario(user, password, name);
// }

// function validarUsuario(user, password, name) {
//   console.log(userLocal, passwordLocal)

//   if (user != userLocal && password == passwordLocal) {
//     alert("Su usuario es erróneo");
//     return login();
//   } else if (password != passwordLocal && user == userLocal) {
//     alert("Su contraseña es errónea");
//     return login();
//   } else if (password != passwordLocal && user != userLocal) {
//     alert("SU USUARIO Y CONTRASEÑA SON ERRÓNEOS");
//     return login();
//   } else if (password == passwordLocal && user == userLocal) {
//     welcome(name);
//   }
// }
// function welcome(name) {
//   alert("Bienvenido " + name);
//   validateEmail();
//   validatePassword();
// }

// function validatePassword() {
//   if (passwordLocal.length < 8) {
//     alert("Su contraseña es insegura.");
//     let optionPass = 0;
//     do {
//       optionPass = prompt("desea ingresar una nueva contraseña? ingrese 1 para SI o 2 para NO");
//     }
//     while (optionPass != 1 && optionPass != 2);
//     switch (optionPass) {
//       case "1":
//         changesPass();
//         break;
//       case "2":
//         break;
//     }
//   }
//   const regexPassword = /(?=.*\d)/;
//   let passwordValidator = false;
//   for (i = 0; i < passwordLocal.length; i++) {
//     if (passwordLocal[i].match(regexPassword)) {
//       passwordValidator = true
//       break;
//     }
//   }
//   if (!passwordValidator) {
//     alert("La contraseña tiene que contener al menos un numero");
//     changesPass();
//   }
// }

// function validateEmail() {
//   let emailValidator = false;
//   for (i = 0; i < userLocal.length; i++) {
//     if (userLocal[i].match(/[@]/)) {
//       alert("Es un mail válido");
//       emailValidator = true;
//       break;
//     }
//   }
//   if (!emailValidator) {
//     let optionEmail = 0;
//     do {
//       optionEmail = prompt("desea ingresar un mail nuevo? ingrese 1 para SI o 2 para NO");
//     }
//     while (optionPass != 1 && optionPass != 2);
//     switch (optionEmail) {
//       case "1":
//         changesEmail();
//         break;
//       case "2":
//         break;
//     }
//   }
// }

// function changesEmail() {
//   userLocal = prompt("Ingresar tu nuevo usuario");
// }

// function changesPass() {
//   passwordLocal = prompt("ingrese nueva contraseña");
//   validatePassword();
// }
