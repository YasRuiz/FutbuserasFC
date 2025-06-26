const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function validarRUT(rut) {
  return /^\d{7,8}-[\dkK]$/.test(rut);
}

function soloLetras(valor) {
  return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor);
}

function tieneNumerosConsecutivos(texto) {
  for (let i = 0; i < texto.length - 2; i++) {
    const a = texto.charCodeAt(i);
    const b = texto.charCodeAt(i + 1);
    const c = texto.charCodeAt(i + 2);
    if (esNumero(texto[i]) && esNumero(texto[i + 1]) && esNumero(texto[i + 2])) {
      if (b === a + 1 && c === b + 1) return true;
    }
  }
  return false;
}

function esNumero(c) {
  return !isNaN(c) && c >= '0' && c <= '9';
}

function esLetra(c) {
  return /^[a-zA-Z]$/.test(c);
}

// LOGIN
document.getElementById("form-login").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const clave = document.getElementById("loginClave").value.trim();
  const usuario = usuarios.find(u => u.correo === email && u.clave === clave);
  if (usuario) {
    localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
    window.location.href = "resumen.html";
  } else {
    alert("Correo o contraseña incorrectos.");
  }
});

// CREAR CUENTA
document.getElementById("form-crear-cuenta").addEventListener("submit", function (e) {
  e.preventDefault();
  const rut = document.getElementById("rut").value.trim();
  const nombre = document.getElementById("nombre").value.trim();
  const apellido = document.getElementById("apellido").value.trim();
  const correo = document.getElementById("correoNuevo").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const clave = document.getElementById("claveNueva").value.trim();
  const mensaje = document.getElementById("mensaje-usuario");

  if (!validarRUT(rut)) {
    mensaje.textContent = "Formato de RUT inválido.";
    return;
  }

  if (!soloLetras(nombre) || !soloLetras(apellido)) {
    mensaje.textContent = "Nombre y Apellido solo deben contener letras.";
    return;
  }

  if (!/^\d{9,15}$/.test(telefono)) {
    mensaje.textContent = "El teléfono debe contener solo números (entre 9 y 15 dígitos).";
    return;
  }

  if (tieneNumerosConsecutivos(clave)) {
    mensaje.textContent = "";
    alert("La contraseña contiene números consecutivos. Usa una más segura.");
    return;
  }

  if (usuarios.find(u => u.rut.toLowerCase() === rut.toLowerCase() || u.correo.toLowerCase() === correo.toLowerCase())) {
    mensaje.textContent = "Usuario ya existe. Recupera tu clave.";
    return;
  }

  const nuevoUsuario = { rut, nombre, apellido, correo, telefono, clave };
  usuarios.push(nuevoUsuario);
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

  mensaje.textContent = "Cuenta creada con éxito. Redirigiendo al pago...";
  setTimeout(() => {
    window.location.href = "resumen.html";
  }, 1500);
});

// RECUPERAR CLAVE
document.getElementById("recuperar-link").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("recuperar-section").style.display = "block";
  window.scrollTo(0, document.body.scrollHeight);
});

document.getElementById("form-recuperar").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailRecuperar = document.getElementById("recuperarEmail").value.trim();
  const mensajeRecuperar = document.getElementById("mensaje-recuperar");

  const usuario = usuarios.find(u => u.correo.toLowerCase() === emailRecuperar.toLowerCase());
  if (usuario) {
    mensajeRecuperar.style.color = "green";
    mensajeRecuperar.textContent = `Tu contraseña es: ${usuario.clave}`;
  } else {
    mensajeRecuperar.style.color = "red";
    mensajeRecuperar.textContent = "Correo no encontrado. Verifica o crea una cuenta.";
  }
});
