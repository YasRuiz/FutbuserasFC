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
