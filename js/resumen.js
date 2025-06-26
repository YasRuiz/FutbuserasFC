const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const resumen = document.getElementById("resumen");
const totalElemento = document.getElementById("total");
let total = 0;

// Mostrar productos en el resumen
carrito.forEach(producto => {
  const li = document.createElement("li");
  li.textContent = `${producto.nombre} - $${producto.precio} CLP`;
  resumen.appendChild(li);
  total += producto.precio;
});

totalElemento.textContent = `Total: $${total} CLP`;

function confirmarPago() {
  const metodo = document.getElementById("metodoPago").value;

  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  localStorage.setItem("metodoPago", metodo);

  if (metodo === "WebPay") {
    window.location.href = "webpay.html";
  } else {
    window.location.href = "pago-exitoso.html";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const resumenUl = document.getElementById("resumen");
  const totalP = document.getElementById("total");

  // 1. Verifica si hay sesión activa
  if (!usuarioActivo) {
    alert("Por favor inicia sesión para continuar.");
    window.location.href = "login.html";
    return;
  }

  // 2. Mostrar saludo con nombre (opcional)
  const saludo = document.createElement("p");
  saludo.innerText = `Hola, ${usuarioActivo.nombre} ${usuarioActivo.apellido}`;
  document.querySelector("section").prepend(saludo);

  // 3. Mostrar productos en resumen
  let total = 0;

  if (carrito.length === 0) {
    resumenUl.innerHTML = "<li>No hay productos en tu carrito.</li>";
    totalP.textContent = "";
    return;
  }

  carrito.forEach(producto => {
    const li = document.createElement("li");
    li.textContent = `${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}`;
    resumenUl.appendChild(li);
    total += producto.precio * producto.cantidad;
  });

  // 4. Mostrar total
  totalP.textContent = `Total a pagar: $${total.toLocaleString()}`;
});

// 5. Función de confirmación de pago
function confirmarPago() {
  const metodo = document.getElementById("metodoPago").value;
  alert(`Gracias por tu compra. Has seleccionado: ${metodo}`);
  localStorage.removeItem("carrito"); // limpia el carrito
  window.location.href = "tienda.html"; // redirige después del pago
}
localStorage.setItem("usuarioActivo", JSON.stringify({
  nombre: "Ana", apellido: "Pérez", correo: "ana@correo.com"
}));

localStorage.setItem("carrito", JSON.stringify([
  { nombre: "Camiseta", cantidad: 1, precio: 15000 },
  { nombre: "Gorro", cantidad: 2, precio: 5000 }
]));