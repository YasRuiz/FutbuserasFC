document.getElementById("formBanco").addEventListener("submit", function(e) {
  e.preventDefault();
  const banco = document.getElementById("banco").value;
  localStorage.setItem("bancoSeleccionado", banco);
  window.location.href = "pago-exitoso.html";
});
