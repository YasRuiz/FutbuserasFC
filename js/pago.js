const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || {};
const metodoPago = localStorage.getItem("metodoPago") || "WebPay";
const banco = localStorage.getItem("bancoSeleccionado") || "";
let total = 0;

// Validación: si no hay productos, redirigir
if (carrito.length === 0) {
  alert("No hay productos en el carrito.");
  window.location.href = "tienda.html";
}

// Composición del mensaje
let mensaje = `🟣 Pedido Futbuseras FC:%0A%0A`;

carrito.forEach(p => {
  mensaje += `• ${p.nombre}: $${p.precio.toLocaleString()} CLP%0A`;
  total += p.precio;
});

mensaje += `%0ATotal: $${total.toLocaleString()} CLP%0A%0A`;
mensaje += `🧾 Datos del Cliente:%0A`;

if (usuario.rut) {
  mensaje += `👤 Nombre: ${usuario.nombre} ${usuario.apellido}%0A`;
  mensaje += `🆔 RUT: ${usuario.rut}%0A`;
  mensaje += `📧 Correo: ${usuario.correo}%0A`;
  mensaje += `📞 Teléfono: ${usuario.telefono}%0A`;
} else {
  mensaje += `📧 Correo: ${usuario.correo || "No disponible"}%0A`;
}

mensaje += `%0A💳 Medio de Pago: ${metodoPago}`;
if (banco) mensaje += `%0A🏦 Banco: ${banco}`;

// WhatsApp
const numero = "56975357329"; // Incluye código de país, sin +
const url = `https://wa.me/${numero}?text=${mensaje}`;

// Al cargar la página
window.onload = () => {
  // Abrir WhatsApp en nueva pestaña
  window.open(url, "_blank");

  // Limpiar carrito
  localStorage.removeItem("carrito");

  // Redirigir al inicio luego de 4 segundos
  setTimeout(() => {
    window.location.href = "../index.html";
  }, 4000);
};