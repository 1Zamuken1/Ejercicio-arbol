const usuariosValidos = [
  {
    email: "admin@educlick.com",
    password: "admin123",
    name: "Administrador 01",
    cell: "3571234567",
    rol: "admin",
    redirect: "./admin/dashboard-admin.html",
  },
  {
    email: "cliente@educlick.com",
    password: "cliente123",
    name: "Cliente 01",
    cell: "3571234567",
    rol: "cliente",
    redirect: "./cliente/dashboard-cliente.html",
  },
  {
    email: "vendedor@educlick.com",
    password: "vendedor123",
    name: "Vendedor 01",
    cell: "3571234567",
    rol: "vendedor",
    redirect: "./vendedor/dashboard-vendedor.html",
  },
];

// Elementos del formulario
const loginForm = document.querySelector("form");
const emailInput = document.getElementById("login_email");
const passwordInput = document.getElementById("login_password");
const errorMessage = document.createElement("div");

// Estilos para errores
errorMessage.className = "text-red-500 text-sm text-center mt-4";
loginForm.appendChild(errorMessage);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  errorMessage.textContent = "";

  if (!email || !password) {
    errorMessage.textContent = "Por favor complete todos los campos";
    return;
  }

  const usuarioValido = usuariosValidos.find(
    (user) => user.email === email && user.password === password
  );

  if (usuarioValido) {
    // Guardar usuario en localStorage
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioValido));

    // Redirigir a su dashboard
    window.location.href = usuarioValido.redirect;
  } else {
    errorMessage.textContent = "Credenciales incorrectas. Intente nuevamente.";
  }
});
