import { Habitacion } from "./models";

// Form Component Props
export interface ReservaFormProps {
  open: boolean;
  onClose: () => void;
  /** Si se abre desde una habitación concreta, se reserva esa (sin dropdown). */
  habitacion?: Habitacion | null;
  /** Fechas precargadas (p. ej. desde la barra de reserva del home). */
  fechaInicioInicial?: string;
  fechaFinInicial?: string;
}
