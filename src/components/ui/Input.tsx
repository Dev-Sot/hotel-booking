import { useId } from "react";
import { InputProps } from "@/types";

export default function Input({
  type = "text",
  placeholder = "",
  value,
  onChange,
  label,
  required = false,
  className = "",
}: InputProps) {
  const generatedId = useId();

  return (
    <div>
      {label && (
        <label htmlFor={generatedId} className="field-label">
          {label}
        </label>
      )}
      <input
        id={generatedId}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`field ${className}`}
      />
    </div>
  );
}
