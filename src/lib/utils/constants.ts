/**
 * Constantes de la aplicación
 */

// Tipos de habitaciones
export const ROOM_TYPES = {
  SUITE: "suite",
  DOBLE: "doble",
  SENCILLA: "sencilla",
} as const;

export const ROOM_TYPE_LABELS = {
  [ROOM_TYPES.SUITE]: "Suite Presidencial",
  [ROOM_TYPES.DOBLE]: "Doble Deluxe",
  [ROOM_TYPES.SENCILLA]: "Sencilla Ejecutiva",
} as const;

// Estados de reserva
export const RESERVATION_STATES = {
  PENDING: "pendiente",
  CONFIRMED: "confirmada",
  CANCELLED: "cancelada",
} as const;

export const RESERVATION_STATE_LABELS = {
  [RESERVATION_STATES.PENDING]: "Pendiente",
  [RESERVATION_STATES.CONFIRMED]: "Confirmada",
  [RESERVATION_STATES.CANCELLED]: "Cancelada",
} as const;

// Servicios del hotel
export const SERVICES = [
  {
    id: "spa",
    title: "Spa & Wellness",
    description: "Tratamientos personalizados y circuito de relajación.",
  },
  {
    id: "gastronomy",
    title: "Gastronomía",
    description: "Restaurante de autor con menú degustación y carta selecta.",
  },
  {
    id: "events",
    title: "Eventos y reuniones",
    description: "Salones equipados para eventos corporativos y celebraciones.",
  },
] as const;

// Rutas de la aplicación
export const ROUTES = {
  HOME: "/",
  ROOMS: "/habitaciones",
  SERVICES: "/servicios",
  RESERVATIONS: "/reservas",
  LOGIN: "/login",
  ADMIN: "/admin",
} as const;

// Mensajes de error comunes
export const ERROR_MESSAGES = {
  INVALID_EMAIL: "El correo no es válido",
  INVALID_PASSWORD: "La contraseña debe tener mínimo 8 caracteres",
  INVALID_NAME: "El nombre debe tener mínimo 2 caracteres",
  INVALID_DATE_RANGE: "La fecha de salida debe ser mayor a la de entrada",
  PAST_DATE: "No puedes seleccionar una fecha en el pasado",
  NETWORK_ERROR: "Error de conexión. Intenta nuevamente",
  SERVER_ERROR: "Error del servidor. Intenta más tarde",
  UNAUTHORIZED: "No tienes permiso para acceder",
  NOT_FOUND: "No encontrado",
} as const;

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  RESERVATION_CREATED: "¡Reserva creada exitosamente!",
  RESERVATION_UPDATED: "¡Reserva actualizada!",
  RESERVATION_CANCELLED: "¡Reserva cancelada!",
  LOGIN_SUCCESS: "¡Sesión iniciada correctamente!",
  LOGOUT_SUCCESS: "¡Sesión cerrada!",
} as const;

// Duraciones de animaciones (ms)
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Límites de paginación
export const PAGINATION = {
  ITEMS_PER_PAGE: 10,
  MAX_ITEMS_PER_PAGE: 50,
} as const;
