/**
 * Helpers para manejar localStorage de forma segura
 */

const isBrowser = typeof window !== "undefined";

export function setItem<T>(key: string, value: T) {
  if (!isBrowser) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    // Silencioso
    console.warn("localStorage set error:", err);
  }
}

export function getItem<T = unknown>(key: string): T | null {
  if (!isBrowser) return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn("localStorage get error:", err);
    return null;
  }
}

export function removeItem(key: string) {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn("localStorage remove error:", err);
  }
}

export function clearAll() {
  if (!isBrowser) return;
  try {
    localStorage.clear();
  } catch (err) {
    console.warn("localStorage clear error:", err);
  }
}
