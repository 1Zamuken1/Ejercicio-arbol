const booksData = {
  masvendidos: [
    {
      id: "hp1",
      title: "Harry Potter y la Piedra Filosofal",
      description:
        "El inicio de la saga mágica más famosa del mundo. Acompaña a Harry en su primera aventura en Hogwarts.",
      price: "COP 79,900",
    },
    {
      id: "hobbit",
      title: "El Hobbit",
      description:
        "La extraordinaria aventura de Bilbo Bolsón que cambió para siempre la Tierra Media.",
      price: "COP 63,900",
    },
    {
      id: "cien-anos",
      title: "Cien Años de Soledad",
      description:
        "La obra maestra de Gabriel García Márquez que define el realismo mágico.",
      price: "COP 91,900",
    },
    {
      id: "dune",
      title: "Dune",
      description:
        "El clásico de ciencia ficción que inspiró películas y generaciones de lectores.",
      price: "COP 99,900",
    },
    {
      id: "1984",
      title: "1984",
      description:
        "La distopía de George Orwell que predijo nuestro futuro tecnológico.",
      price: "COP 75,900",
    },
    {
      id: "fuego",
      title: "Juego de Tronos",
      description:
        "La historia épica de Westeros donde el poder y la traición reinan.",
      price: "COP 85,900",
    },
    {
      id: "paulo",
      title: "El Alquimista",
      description:
        "Una fábula sobre seguir tus sueños y encontrar tu leyenda personal.",
      price: "COP 58,900",
    },
    {
      id: "divergente",
      title: "Divergente",
      description:
        "Una sociedad dividida por virtudes. Una chica que desafía todo.",
      price: "COP 69,900",
    },
  ],

  novedades: [
    {
      id: "klara",
      title: "Klara y el Sol",
      description:
        "La nueva obra maestra de Kazuo Ishiguro sobre inteligencia artificial y humanidad.",
      price: "COP 107,900",
    },
    {
      id: "ciudad-vapor",
      title: "La Ciudad del Vapor",
      description:
        "Relatos que expanden el universo de 'La Sombra del Viento'.",
      price: "COP 87,900",
    },
    {
      id: "susurros",
      title: "Susurros en la Niebla",
      description:
        "Un thriller psicológico que mantendrá en vilo hasta la última página.",
      price: "COP 79,900",
    },
    {
      id: "lapida",
      title: "La Lápida",
      description:
        "Una historia de misterio enterrada entre las tumbas del pasado.",
      price: "COP 84,900",
    },
    {
      id: "invisible",
      title: "Invisible",
      description: "¿Hasta dónde puede llegar el silencio de un adolescente?",
      price: "COP 73,900",
    },
    {
      id: "anhelo",
      title: "Anhelo",
      description: "Una historia juvenil con romance y fantasía sobrenatural.",
      price: "COP 92,900",
    },
    {
      id: "karma",
      title: "El Karma de Vivir",
      description: "Reflexiones sobre decisiones y consecuencias.",
      price: "COP 68,900",
    },
    {
      id: "destino",
      title: "Contra el Destino",
      description: "Un relato de valentía ante lo inevitable.",
      price: "COP 79,900",
    },
  ],

  clasicos: [
    {
      id: "quijote",
      title: "Don Quijote de La Mancha",
      description:
        "La obra cumbre de Miguel de Cervantes y pilar de la literatura universal.",
      price: "COP 119,900",
    },
    {
      id: "orgullo",
      title: "Orgullo y Prejuicio",
      description:
        "La novela romántica de Jane Austen que definió un género literario.",
      price: "COP 71,900",
    },
    {
      id: "moby-dick",
      title: "Moby Dick",
      description:
        "La épica aventura de Herman Melville sobre la obsesión y el mar.",
      price: "COP 95,900",
    },
    {
      id: "frankenstein",
      title: "Frankenstein",
      description:
        "El clásico de Mary Shelley que explora los límites de la ciencia y la moral.",
      price: "COP 65,900",
    },
    {
      id: "dracula",
      title: "Drácula",
      description: "El icónico vampiro que dio origen al mito moderno.",
      price: "COP 72,900",
    },
    {
      id: "emma",
      title: "Emma",
      description:
        "Otra joya de Jane Austen que combina ingenio, romance y crítica social.",
      price: "COP 74,900",
    },
    {
      id: "corazon",
      title: "Corazón, Diario de un Niño",
      description:
        "Un clásico de la literatura italiana para jóvenes con grandes valores.",
      price: "COP 61,900",
    },
    {
      id: "fausto",
      title: "Fausto",
      description:
        "La tragedia filosófica de Goethe sobre el pacto con el diablo.",
      price: "COP 82,900",
    },
  ],
};

// Variables globales para las DataTables
let usuariosTable = null;
let productosTable = null;

// Variables para almacenar los datos persistentes
let globalUsersData = [
  {
    id: 1,
    nombre: "Juan Pérez",
    correo: "juan.perez@educlick.com",
    rol: "Admin",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "María García",
    correo: "maria.garcia@educlick.com",
    rol: "Editor",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Carlos López",
    correo: "carlos.lopez@educlick.com",
    rol: "Lector",
    estado: "Inactivo",
  },
  {
    id: 4,
    nombre: "Ana Martínez",
    correo: "ana.martinez@educlick.com",
    rol: "Editor",
    estado: "Activo",
  },
  {
    id: 5,
    nombre: "Luis Rodríguez",
    correo: "luis.rodriguez@educlick.com",
    rol: "Lector",
    estado: "Inactivo",
  },
];
let globalProductsData = [];

// Función para obtener datos de productos desde booksData del carrusel
function getProductsData() {
  if (globalProductsData.length === 0) {
    let idCounter = 1;
    for (const category in booksData) {
      booksData[category].forEach((book) => {
        globalProductsData.push({
          id: idCounter++,
          nombre: book.title,
          categoria: category,
          precio: book.price,
          stock: Math.floor(Math.random() * 50),
          estado: Math.random() > 0.2 ? "Disponible" : "Agotado",
          descripcion: book.description,
        });
      });
    }
  }
  return globalProductsData;
}

// Funciones para manejar modales
function abrirModal(id) {
  const modal = document.getElementById(id);
  modal.classList.add("active");
  modal.classList.remove("opacity-0", "pointer-events-none");

  const modalCard = modal.querySelector(".modal-card");
  if (modalCard) {
    modalCard.classList.add("active");
    modalCard.classList.remove("scale-95", "opacity-0");
  }

  // Inicializar DataTable si no está inicializado
  if (id === "modalUsuario" && !usuariosTable) {
    usuariosTable = $("#tablaUsuarios").DataTable({
      responsive: true,
      pageLength: 10,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      },
      data: globalUsersData,
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "correo" },
        { data: "rol" },
        {
          data: "estado",
          render: function (data, type, row) {
            const color =
              data === "Activo"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800";
            return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${data}</span>`;
          },
        },
        {
          data: null,
          render: function (data, type, row) {
            return `
                            <div class="flex flex-wrap gap-2">
                                <button onclick="verUsuario(${row.id})" class="btn-action btn-view">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    Ver
                                </button>
                                <button onclick="editarUsuario(${row.id})" class="btn-action btn-edit">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Editar
                                </button>
                                <button onclick="eliminarUsuario(${row.id})" class="btn-action btn-delete">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                            `;
          },
          orderable: false,
        },
      ],
    });
  }

  if (id === "modalProducto" && !productosTable) {
    productosTable = $("#tablaProductos").DataTable({
      responsive: true,
      pageLength: 10,
      language: {
        url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json",
      },
      data: getProductsData(),
      columns: [
        { data: "id" },
        { data: "nombre" },
        { data: "categoria" },
        { data: "precio" },
        { data: "stock" },
        {
          data: "estado",
          render: function (data, type, row) {
            const color =
              data === "Disponible"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800";
            return `<span class="px-2 py-1 rounded-full text-xs font-medium ${color}">${data}</span>`;
          },
        },
        {
          data: null,
          render: function (data, type, row) {
            return `
                            <div class="flex flex-wrap gap-2">
                                <button onclick="verProducto(${row.id})" class="btn-action btn-view">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                    </svg>
                                    Ver
                                </button>
                                <button onclick="editarProducto(${row.id})" class="btn-action btn-edit">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                    </svg>
                                    Editar
                                </button>
                                <button onclick="eliminarProducto(${row.id})" class="btn-action btn-delete">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                            `;
          },
          orderable: false,
        },
      ],
    });
  }
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("active");
  modal.classList.add("opacity-0", "pointer-events-none");

  const modalCard = modal.querySelector(".modal-card");
  if (modalCard) {
    modalCard.classList.remove("active");
    modalCard.classList.add("scale-95", "opacity-0");
  }
}

// Funciones para usuarios
function verUsuario(id) {
  const usuario = globalUsersData.find((u) => u.id === id);
  if (usuario) {
    alert(
      `Detalles del usuario:\nID: ${usuario.id}\nNombre: ${usuario.nombre}\nEmail: ${usuario.correo}\nRol: ${usuario.rol}\nEstado: ${usuario.estado}`
    );
  } else {
    alert("Usuario no encontrado");
  }
}

function editarUsuario(id) {
  alert(`Editando usuario ${id}`);
}

function eliminarUsuario(id) {
  if (confirm(`¿Estás seguro de eliminar al usuario ${id}?`)) {
    // Eliminar del array de datos
    globalUsersData = globalUsersData.filter((u) => u.id !== id);

    // Actualizar la tabla si está inicializada
    if (usuariosTable) {
      usuariosTable.clear().rows.add(globalUsersData).draw();
    }

    alert(`Usuario ${id} eliminado`);
  }
}

// Funciones para productos
function verProducto(id) {
  const producto = globalProductsData.find((p) => p.id === id);
  if (producto) {
    // Llenar el modal de detalles
    document.getElementById("verId").textContent = producto.id;
    document.getElementById("verNombre").textContent = producto.nombre;
    document.getElementById("verCategoria").textContent = producto.categoria;
    document.getElementById("verPrecio").textContent = producto.precio;
    document.getElementById("verStock").textContent = producto.stock;
    document.getElementById("verEstado").textContent = producto.estado;
    document.getElementById("verDescripcion").textContent =
      producto.descripcion;

    // Abrir el modal de ver detalles
    abrirModal("modalVerProducto");
  } else {
    alert("Producto no encontrado");
  }
}

let productoActual = null;

function editarProducto(id) {
  productoActual = globalProductsData.find((p) => p.id === id);

  if (productoActual) {
    // Llenar el formulario con los datos del producto
    document.getElementById("editarNombre").value = productoActual.nombre;
    document.getElementById("editarCategoria").value = productoActual.categoria;
    document.getElementById("editarPrecio").value = productoActual.precio;
    document.getElementById("editarStock").value = productoActual.stock;
    document.getElementById("editarEstado").value = productoActual.estado;
    document.getElementById("editarDescripcion").value =
      productoActual.descripcion;

    // Abrir el modal de edición
    abrirModal("modalEditarProducto");
  } else {
    alert("Producto no encontrado");
  }
}

function eliminarProducto(id) {
  productoActual = globalProductsData.find((p) => p.id === id);

  if (productoActual) {
    document.getElementById(
      "mensajeEliminacion"
    ).textContent = `¿Estás seguro de que deseas eliminar el producto "${productoActual.nombre}"?`;

    // Abrir el modal de confirmación
    abrirModal("modalConfirmarEliminacion");
  } else {
    alert("Producto no encontrado");
  }
}

// Función para confirmar eliminación
function confirmarEliminacion() {
  if (productoActual) {
    // Eliminar del array de datos
    globalProductsData = globalProductsData.filter(
      (p) => p.id !== productoActual.id
    );

    // Actualizar la tabla si está inicializada
    if (productosTable) {
      productosTable.clear().rows.add(globalProductsData).draw();
    }

    // Mostrar alerta y cerrar modal
    alert(`Producto "${productoActual.nombre}" eliminado`);
    cerrarModal("modalConfirmarEliminacion");
    productoActual = null;
  }
}

// Configurar el formulario de edición
document
  .getElementById("formEditarProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (productoActual) {
      // Actualizar los datos del producto
      productoActual.nombre = document.getElementById("editarNombre").value;
      productoActual.categoria =
        document.getElementById("editarCategoria").value;
      productoActual.precio = document.getElementById("editarPrecio").value;
      productoActual.stock = parseInt(
        document.getElementById("editarStock").value
      );
      productoActual.estado = document.getElementById("editarEstado").value;
      productoActual.descripcion =
        document.getElementById("editarDescripcion").value;

      // Actualizar la tabla si está inicializada
      if (productosTable) {
        productosTable.clear().rows.add(globalProductsData).draw();
      }

      // Mostrar alerta y cerrar modal
      alert(`Cambios guardados para "${productoActual.nombre}"`);
      cerrarModal("modalEditarProducto");
      productoActual = null;
    }
  });

// Configurar el formulario de agregar
document
  .getElementById("formAgregarProducto")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Obtener datos del formulario
    const nombre = document.getElementById("agregarNombre").value;
    const categoria = document.getElementById("agregarCategoria").value;
    const precio = document.getElementById("agregarPrecio").value;
    const stock = parseInt(document.getElementById("agregarStock").value);
    const estado = document.getElementById("agregarEstado").value;
    const descripcion = document.getElementById("agregarDescripcion").value;

    // Crear nuevo producto
    const nuevoId =
      globalProductsData.length > 0
        ? Math.max(...globalProductsData.map((p) => p.id)) + 1
        : 1;

    const nuevoProducto = {
      id: nuevoId,
      nombre,
      categoria,
      precio,
      stock,
      estado,
      descripcion,
    };

    // Agregar a los datos
    globalProductsData.push(nuevoProducto);

    // Actualizar la tabla si está inicializada
    if (productosTable) {
      productosTable.clear().rows.add(globalProductsData).draw();
    }

    // Mostrar alerta y cerrar modal
    alert(`Producto "${nombre}" agregado correctamente`);
    cerrarModal("modalAgregarProducto");

    // Resetear formulario
    document.getElementById("formAgregarProducto").reset();
  });

// Función para cerrar sesión
function cerrarSesion() {
  if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
    alert("Sesión cerrada");
    window.location.href = "../index.html";
  }
}

// Cerrar modal al hacer clic fuera
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    const modalId = e.target.id;
    cerrarModal(modalId);
  }
});

// Cerrar modal con tecla ESC
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      cerrarModal(activeModal.id);
    }
  }
});
