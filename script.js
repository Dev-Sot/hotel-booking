import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Inicializa Supabase
const supabaseUrl = "https://dcdsvbbwrqhnehbzzarr.supabase.co";
const supabaseKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRjZHN2YmJ3cnFobmVoYnp6YXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEwODg4NzYsImV4cCI6MjA3NjY2NDg3Nn0.V38025qoQ9E_E8KFX9UF576ZdTYwFrz0hGQG1C00cIo";
const supabase = createClient(supabaseUrl, supabaseKey);

// Elementos del DOM
const authSection = document.getElementById("auth-section");
const loginBtn = document.getElementById("login-btn");

const openModalBtn = document.getElementById("open-reserva");
const modal = document.getElementById("reserva-modal");
const closeModalBtn = document.getElementById("close-modal");
const reservaForm = document.getElementById("reserva-form");

// --- Función para verificar sesión ---
async function checkUser() {
  const { data } = await supabase.auth.getUser();
  const user = data?.user;

  if (user) {
    authSection.innerHTML = `
      <span class="mr-3">${user.email}</span>
      <button id="logout-btn" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cerrar sesión</button>
    `;
    document.getElementById("logout-btn").addEventListener("click", async () => {
      await supabase.auth.signOut();
      location.reload();
    });
  } else {
    authSection.innerHTML = `
      <button id="login-btn" class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
        Iniciar sesión
      </button>
    `;
    document.getElementById("login-btn").addEventListener("click", signInWithGoogle);
  }
}

// --- Función login Google ---
async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: window.location.origin },
  });
  if (error) console.error("Error al iniciar sesión:", error.message);
}

// --- Manejo modal ---
openModalBtn.addEventListener("click", async () => {
  const { data } = await supabase.auth.getUser();
  if (!data?.user) {
    alert("⚠️ Debes iniciar sesión para reservar.");
    return;
  }
  modal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// --- Manejo formulario de reservas ---
reservaForm.addEventListener("submit", async (e) => {
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

  // Simulación de confirmación (luego se guardará en Supabase)
  alert(`Reserva confirmada para ${nombre} (${tipo}) del ${fechaInicio} al ${fechaFin}`);
  reservaForm.reset();
  modal.classList.add("hidden");
});

// --- Inicialización ---
checkUser();