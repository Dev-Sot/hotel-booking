/**
 * Iconos de línea fina (stroke 1.25) para mantener un lenguaje visual
 * sobrio y consistente en toda la app, en lugar de emojis.
 */
const PATHS = {
  spa: "M12 21c-4.5 0-8-3-8-7 3 0 6 1.5 8 4 2-2.5 5-4 8-4 0 4-3.5 7-8 7Zm0-3c-1.5-2.5-2-5-2-7.5C10 7 11 4.5 12 3c1 1.5 2 4 2 7.5 0 2.5-.5 5-2 7.5Z",
  dining: "M6 3v7a2 2 0 0 0 2 2v9M10 3v7a2 2 0 0 1-2 2M8 3v6M17 21V3c-2 1-3 3.5-3 7 0 1.5.8 2.5 3 2.5",
  fitness: "M3 10v4M6 7v10M18 7v10M21 10v4M6 12h12",
  pool: "M3 17c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M3 20.5c1.5 1 3 1 4.5 0s3-1 4.5 0 3 1 4.5 0 3-1 4.5 0M8 14V5a2 2 0 0 1 4 0M16 14V5a2 2 0 0 0-4 0M8 8h8M8 11h8",
  concierge: "M4 18h16M5 18a7 7 0 0 1 14 0M12 11V9M10 9h4M3 21h18",
  cinema: "M3 8h18v12H3zM3 8l3-5M9 8l3-5M15 8l3-5",
  business: "M3 8h18v12H3zM8 8V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v3M3 13h18",
  car: "M5 16h14M4 16v-4l2-5h12l2 5v4M4 16v2M20 16v2M7.5 13h.01M16.5 13h.01",
  child: "M12 7a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM8 22v-6l-2-4 6-2 6 2-2 4v6M12 10v12",
  library: "M4 4h4v16H4zM10 4h4v16h-4zM16 5l3.5-1 3 15.5-3.5 1z",
  events: "M4 21V10l8-6 8 6v11M9 21v-6h6v6",
  boutique: "M5 8h14l-1 13H6L5 8ZM9 8V6a3 3 0 0 1 6 0v2",
  location: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
  mail: "M3 6h18v12H3zM3 6l9 7 9-7",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  guests: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21a7 7 0 0 1 14 0M16 3.5a4 4 0 0 1 0 7.5M18 14a6 6 0 0 1 4 7",
  bed: "M3 18V6M3 14h18v4M21 18v-4a3 3 0 0 0-3-3h-7v3M7 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  area: "M4 4h16v16H4zM4 9h5V4M20 15h-5v5",
  view: "M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  close: "M6 6l12 12M18 6 6 18",
  check: "M5 12.5 10 17 19 7",
  user: "M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4 21a8 8 0 0 1 16 0",
  chevronDown: "M6 9l6 6 6-6",
  logout: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10",
  shield: "M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9L12 3.5Z",
  wifi: "M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  plus: "M12 5v14M5 12h14",
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}

export default function Icon({ name, className = "h-5 w-5", strokeWidth = 1.25 }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
