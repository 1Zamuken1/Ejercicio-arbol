// Saludo
const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
const saludo = document.getElementById("saludoUsuario");
if (usuario && saludo) {
  saludo.textContent = `Bienvenido ${usuario.rol} ${usuario.name}`;
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "../index.html";
}

function abrirModal(id) {
  const modal = document.getElementById(id);
  const card = modal.querySelector(`#${id}Card`);
  modal.classList.remove("opacity-0", "pointer-events-none");
  setTimeout(() => {
    card.classList.remove("scale-95", "opacity-0");
    card.classList.add("scale-100", "opacity-100");
  }, 10);
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  const card = modal.querySelector(`#${id}Card`);
  card.classList.remove("scale-100", "opacity-100");
  card.classList.add("scale-95", "opacity-0");
  setTimeout(() => {
    modal.classList.add("opacity-0", "pointer-events-none");
  }, 200);
}

$(document).ready(function () {
  $('#tablaUsuarios').DataTable({
    data: [
      ["Juan", "juan@mail.com", "Admin", "1234567890", accionesHtml()],
      ["Ana", "ana@mail.com", "Cliente", "0987654321", accionesHtml()]
    ],
    columns: [
      { title: "Nombre" },
      { title: "Correo" },
      { title: "Rol" },
      { title: "Celular" },
      { title: "Acciones" }
    ]
  });

// Combinar todos los libros en un solo array plano
const librosTotales = [
  ...booksData.masvendidos.map(libro => ({ ...libro, categoria: "Más vendidos" })),
  ...booksData.novedades.map(libro => ({ ...libro, categoria: "Novedades" })),
  ...booksData.clasicos.map(libro => ({ ...libro, categoria: "Clásicos" })),
];

// Transformar a formato que entienda DataTable
const dataFormateada = librosTotales.map(libro => [
  libro.title,
  libro.price,
  libro.categoria,
  libro.description,
  accionesHtml(libro.id) // Puedes enviar el ID si quieres asociar luego
]);

// Inicializar la tabla
$('#tablaProductos').DataTable({
  data: dataFormateada,
  columns: [
    { title: "Nombre" },
    { title: "Precio" },
    { title: "Categoría" },
    { title: "Descripción" },
    { title: "Acciones" }
  ]
});

});

function accionesHtml() {
  return `
    <button class="text-sm text-blue-600 hover:underline mr-2">Editar</button>
    <button class="text-sm text-red-600 hover:underline">Eliminar</button>
  `;
}
