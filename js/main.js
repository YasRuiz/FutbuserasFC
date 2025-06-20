// Carrusel automático
const slides = document.querySelectorAll(".carousel img");
let current = 0;
setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 3000);

// Cerrar menú móvil al hacer clic en un enlace
const toggle = document.getElementById('menu-toggle');
document.querySelectorAll('.menu-links a').forEach(link => {
  link.addEventListener('click', () => {
    toggle.checked = false;
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function (e) {
  if (
    toggle.checked &&
    !e.target.closest('.menu-links') &&
    !e.target.closest('.menu-icon') &&
    e.target !== toggle
  ) {
    toggle.checked = false;
  }
});

// Modal para mostrar imágenes ampliadas
function mostrarImagen(img) {
  const modal = document.getElementById("modal");
  const imgGrande = document.getElementById("img-grande");
  modal.style.display = "flex";
  imgGrande.src = img.src;
  imgGrande.alt = img.alt;
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}