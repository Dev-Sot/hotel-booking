/**
 * Logger simple para desarrollo
 */

const isDev = process.env.NODE_ENV !== "production";

export function info(...args: any[]) {
  if (!isDev) return;
  console.info("[INFO]", ...args);
}

export function warn(...args: any[]) {
  if (!isDev) return;
  console.warn("[WARN]", ...args);
}

export function error(...args: any[]) {
  if (!isDev) return;
  console.error("[ERROR]", ...args);
}

export function debug(...args: any[]) {
  if (!isDev) return;
  console.debug("[DEBUG]", ...args);
}
