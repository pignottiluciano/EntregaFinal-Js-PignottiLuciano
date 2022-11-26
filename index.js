let userLocal = "luciano@gmail.com";
let passwordLocal = "abc";

function login() {
  let name = prompt("Ingresar tu nombre");
  let user = prompt("Ingresa tu usuario");
  let password = prompt("Ingresa tu contraseña");
  validarUsuario(user, password, name);
}

function validarUsuario(user, password, name) {
  console.log(userLocal, passwordLocal)

  if (user != userLocal && password == passwordLocal) {
    alert("Su usuario es erróneo");
    return login();
  } else if (password != passwordLocal && user == userLocal) {
    alert("Su contraseña es errónea");
    return login();
  } else if (password != passwordLocal && user != userLocal) {
    alert("SU USUARIO Y CONTRASEÑA SON ERRÓNEOS");
    return login();
  } else if (password == passwordLocal && user == userLocal) {
    welcome(name);
  }
}
function welcome(name) {
  alert("Bienvenido " + name);
  validateEmail();
  validatePassword();
}

function validatePassword() {
  if (passwordLocal.length < 8) {
    alert("Su contraseña es insegura.");
    let optionPass = 0;
    do {
      optionPass = prompt("desea ingresar una nueva contraseña? ingrese 1 para SI o 2 para NO");
    }
    while (optionPass != 1 && optionPass != 2);
    switch (optionPass) {
      case "1":
        changesPass();
        break;
      case "2":
        break;
    }
  }
  const regexPassword = /(?=.*\d)/;
  let passwordValidator = false;
  for (i = 0; i < passwordLocal.length; i++) {
    if (passwordLocal[i].match(regexPassword)) {
      passwordValidator = true
      break;
    }
  }
  if (!passwordValidator) {
    alert("La contraseña tiene que contener al menos un numero");
    changesPass();
  }
}

function validateEmail() {
  let emailValidator = false;
  for (i = 0; i < userLocal.length; i++) {
    if (userLocal[i].match(/[@]/)) {
      alert("Es un mail válido");
      emailValidator = true;
      break;
    }
  }
  if (!emailValidator) {
    let optionEmail = 0;
    do {
      optionEmail = prompt("desea ingresar un mail nuevo? ingrese 1 para SI o 2 para NO");
    }
    while (optionPass != 1 && optionPass != 2);
    switch (optionEmail) {
      case "1":
        changesEmail();
        break;
      case "2":
        break;
    }
  }
}

function changesEmail() {
  userLocal = prompt("Ingresar tu nuevo usuario");
}

function changesPass() {
  passwordLocal = prompt("ingrese nueva contraseña");
  validatePassword();
}