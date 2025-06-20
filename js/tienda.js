let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio, 0);

function agregarAlCarrito(nombre, precio) {
  const id = Date.now();
  carrito.push({ id, nombre, precio });
  total += precio;
  actualizarCarrito();
}

function eliminarDelCarrito(idProducto) {
  const index = carrito.findIndex(item => item.id === idProducto);
  if (index !== -1) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    actualizarCarrito();
  }
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();
}

function confirmarCompra() {
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  window.location.href = "login.html";
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";
  carrito.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - $${item.precio} CLP
      <button onclick="eliminarDelCarrito(${item.id})"
        style="margin-left:10px;background:#ff00cc;color:white;border:none;border-radius:4px;cursor:pointer;">
        X
      </button>
    `;
    lista.appendChild(li);
  });
  document.getElementById("total").textContent = total;
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

actualizarCarrito();
