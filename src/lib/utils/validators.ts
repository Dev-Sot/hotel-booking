/**
 * Validadores para formularios y datos
 */

/**
 * Validar email
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validar contraseña (mínimo 8 caracteres)
 */
export function validatePassword(password: string): boolean {
  return password.length >= 8;
}

/**
 * Validar nombre (no vacío, mínimo 2 caracteres)
 */
export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

/**
 * Validar teléfono
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
}

/**
 * Validar fechas (que fecha fin sea mayor a fecha inicio)
 */
export function validateDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return end > start;
}

/**
 * Validar que la fecha no sea en el pasado
 */
export function validateFutureDate(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return selectedDate >= today;
}
