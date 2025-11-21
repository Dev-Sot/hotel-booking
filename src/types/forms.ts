// Form Component Props
export interface LoginFormProps {
  open: boolean;
  onClose: () => void;
}

export interface ReservaFormProps {
  open: boolean;
  onClose: () => void;
}

// Form Values
export interface LoginFormValues {
  email: string;
}

export interface ReservaFormValues {
  nombre: string;
  tipo: string;
  fechaInicio: string;
  fechaFin: string;
}
