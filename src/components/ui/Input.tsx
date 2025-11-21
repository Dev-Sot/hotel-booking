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
  return (
    <div>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full border border-gray-300 rounded-lg p-2 
          focus:outline-none focus:ring-2 focus:ring-amber-500
          ${className}
        `}
      />
    </div>
  );
}
