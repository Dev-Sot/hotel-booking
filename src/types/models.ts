// Data Models
export interface User {
  id: string;
  email: string;
  nombre?: string;
  apellido?: string;
  createdAt: string;
}

export interface Habitacion {
  id: string;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  tipo: "suite" | "doble" | "sencilla";
  activa: boolean;
}

export interface Reserva {
  id: string;
  usuarioId: string;
  habitacionId: string;
  nombre: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
  estado: "pendiente" | "confirmada" | "cancelada";
  createdAt: string;
}

export interface Servicio {
  id: string;
  titulo: string;
  descripcion: string;
  icono?: string;
}
