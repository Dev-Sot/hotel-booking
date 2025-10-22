import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Inicializa Supabase
const supabaseUrl = "https://dcdsvbbwrqhnehbzzarr.supabase.co";
const supabaseKey = "TU_SUPABASE_ANON_KEY"; // ⚠️ Reemplaza por tu clave anónima de Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Elementos del DOM
const authSection = document.getElementById("auth-section");
const loginBtn = document.getElementById("login-btn");

// --- Verifica si el usuario ya está autenticado ---
async function checkUser() {
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (user) {
    // Usuario autenticado → muestra email y botón de cerrar sesión
    authSection.innerHTML = `
      <span class="mr-3">👤 ${user.email}</span>
      <button id="logout-btn" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cerrar sesión</button>
    `;

    // Escucha el cierre de sesión
    document.getElementById("logout-btn").addEventListener("click", async () => {
      await supabase.auth.signOut();
      location.reload();
    });
  } else {
    // No autenticado → muestra el botón de login
    authSection.innerHTML = `<button id="login-btn" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Iniciar sesión</button>`;
    document.getElementById("login-btn").addEventListener("click", signInWithGoogle);
  }
}

// --- Función de inicio de sesión con Google ---
async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin, // redirige a la misma página tras el login
    },
  });
  if (error) console.error("Error al iniciar sesión:", error.message);
}

// --- Verificación inicial ---
checkUser();

// --- Manejo del formulario de reservas ---
const form = document.getElementById("reserva-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (!user) {
      alert("⚠️ Debes iniciar sesión antes de hacer una reserva.");
      return;
    }

    const nombre = document.getElementById("nombre").value;
    const tipo = document.getElementById("tipo-habitacion").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;

    // Simulación: mostrar confirmación (más adelante lo guardamos en Supabase)
    alert(`Reserva confirmada para ${nombre} (${tipo}) del ${fechaInicio} al ${fechaFin}`);
    form.reset();
  });
}
