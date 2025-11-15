import { motion } from "framer-motion";
import { ButtonProps } from "@/types";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  fullWidth = false,
  className = "",
}: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition";
  
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-600 text-gray-900",
    secondary: "bg-gray-900 hover:bg-gray-800 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${fullWidth ? "w-full" : ""} 
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
