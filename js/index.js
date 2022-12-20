let contenedorProductos = document.getElementById('contenedor-productos');

productos.forEach((producto) => {

  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
  <img src=${producto.img} alt= "">
  <h3>${producto.nombre}</h3>
  <p class="precioProducto">Precio:$ ${producto.precio}</p>
  <button id="oferta${producto.id}" class="boton-descuento">ver descuento</button>
  `

  contenedorProductos.appendChild(div)
  const boton = document.getElementById(`oferta${producto.id}`)
  //Por cada elemento de mi array, creo un div

  boton.addEventListener('click', () => {
      //esta funcion ejecuta que muestre si hay oferta
      mostrarOferta(producto.id)
  })
})

//ordenar de A a Z
let ordenMenor = document.getElementById('orden-menor');
ordenMenor.addEventListener('click', () => {
  const consulta = productos.sort( (a, b) => {
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return -1;
    }
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  console.log(consulta)
})

//ordenar de Z a A
let ordenMayor = document.getElementById('orden-mayor');
ordenMayor.addEventListener('click', () => {
  const consulta = productos.sort( (a, b) => {
    if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
      return -1;
    }
    if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  console.log(consulta)

})

//muestra el descuento.
let  mostrarOferta = (prodId) => {
  let  item = productos.find((producto) => producto.id === prodId)
  if (item.oferta){
    console.log('El precio es = $' + item.precio + " pero tiene un descuento y su precio final es = $" + item.precio*0.8);
  } 
  else {
    console.log('El precio final = $' + item.precio + " este articulo no tiene descuento");
  }
};

//Busqueda de producto por id
let buscarProducto = document.getElementById('buscar-producto');
buscarProducto.addEventListener('click', () => {
  let prodId = prompt("Ingrese ID del producto");
  buscador(prodId);
})

let  buscador = (prodId) => {
  let  item = productos.find((producto) => producto.id == prodId)
  if (item.id){
    alert("El producto buscado es: " + item.nombre + " y su precio es= $" + item.precio);
  } 
  else {
    alert("El producto buscado no existo");
  }
};



































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