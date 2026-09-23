import { ButtonProps } from "@/types";

const VARIANTS = {
  primary: "btn-gold",
  secondary: "btn-outline",
  danger: "btn-danger",
};

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
