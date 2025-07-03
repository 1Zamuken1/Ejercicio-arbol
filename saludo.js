document.addEventListener("DOMContentLoaded", () => {
  const saludo = document.getElementById("saludoUsuario");

  try {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario && usuario.name && usuario.rol) {
      saludo.textContent = `Bienvenido ${usuario.rol} ${usuario.name}`;
    } else {
      saludo.textContent = "Sesión no iniciada";
    }
  } catch (error) {
    saludo.textContent = "Error cargando usuario";
    console.error("Error al cargar usuarioActivo:", error);
  }
});

// Función para cerrar sesión
function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "../index.html"; // Redirige al inicio o login
}
