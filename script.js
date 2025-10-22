// ======================
// AUTENTICACIÓN GOOGLE
// ======================

// Inicializa Firebase (si no está ya)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loginBtn = document.getElementById("login-btn");
const authSection = document.getElementById("auth-section");

// 🔸 Iniciar sesión con Google
loginBtn.addEventListener("click", async () => {
  try {
    await auth.signInWithPopup(provider);
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
});

// 🔸 Detectar cambios en la sesión
auth.onAuthStateChanged((user) => {
  if (user) {
    // Usuario autenticado
    authSection.innerHTML = `
      <span>${user.email}</span>
      <button id="logout-btn">Cerrar sesión</button>
    `;

    document.getElementById("logout-btn").addEventListener("click", () => {
      auth.signOut();
    });
  } else {
    // No hay usuario autenticado
    authSection.innerHTML = `<button id="login-btn">Iniciar sesión</button>`;
    document.getElementById("login-btn").addEventListener("click", async () => {
      try {
        await auth.signInWithPopup(provider);
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    });
  }
});

// ===============================
//  CONTROL DE RESERVAS SEGÚN LOGIN
// ===============================
const reservaForm = document.getElementById("reserva-form");

if (reservaForm) {
  reservaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = firebase.auth().currentUser;

    if (!user) {
      alert("Debes iniciar sesión con Google antes de hacer una reserva.");
      return;
    }

    // Si el usuario está autenticado
    const nombre = document.getElementById("nombre").value;
    const tipoHabitacion = document.getElementById("tipo-habitacion").value;
    const fechaInicio = document.getElementById("fecha-inicio").value;
    const fechaFin = document.getElementById("fecha-fin").value;

    // Aquí luego conectaremos con la base de datos
    console.log("Reserva realizada por:", user.email);
    console.log({ nombre, tipoHabitacion, fechaInicio, fechaFin });

    alert(`✅ Reserva registrada para ${user.email}`);
    reservaForm.reset();
  });
}
