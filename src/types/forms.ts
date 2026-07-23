import { Habitacion } from "./models";

// Form Component Props
export interface ReservaFormProps {
  open: boolean;
  onClose: () => void;
  /** Si se abre desde una habitación concreta, se reserva esa (sin dropdown). */
  habitacion?: Habitacion | null;
}
