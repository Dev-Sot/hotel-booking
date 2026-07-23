import { describe, expect, it } from "vitest";
import {
  validateDateRange,
  validateEmail,
  validateFutureDate,
  validateName,
  validatePassword,
  validatePhone,
} from "./validators";

describe("validateEmail", () => {
  it("acepta correos válidos", () => {
    expect(validateEmail("user@example.com")).toBe(true);
  });

  it("rechaza correos sin arroba o dominio", () => {
    expect(validateEmail("user@example")).toBe(false);
    expect(validateEmail("userexample.com")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("requiere mínimo 8 caracteres", () => {
    expect(validatePassword("1234567")).toBe(false);
    expect(validatePassword("12345678")).toBe(true);
  });
});

describe("validateName", () => {
  it("rechaza nombres vacíos o muy cortos", () => {
    expect(validateName("")).toBe(false);
    expect(validateName("A")).toBe(false);
    expect(validateName("  ")).toBe(false);
  });

  it("acepta nombres de 2+ caracteres", () => {
    expect(validateName("Ana")).toBe(true);
  });
});

describe("validatePhone", () => {
  it("acepta formatos comunes de teléfono", () => {
    expect(validatePhone("+1 (555) 123-4567")).toBe(true);
  });

  it("rechaza cadenas demasiado cortas", () => {
    expect(validatePhone("123")).toBe(false);
  });
});

describe("validateDateRange", () => {
  it("exige que la fecha de fin sea posterior a la de inicio", () => {
    expect(validateDateRange("2026-01-10", "2026-01-15")).toBe(true);
    expect(validateDateRange("2026-01-15", "2026-01-10")).toBe(false);
    expect(validateDateRange("2026-01-10", "2026-01-10")).toBe(false);
  });
});

describe("validateFutureDate", () => {
  it("rechaza fechas en el pasado", () => {
    expect(validateFutureDate("2000-01-01")).toBe(false);
  });

  it("acepta hoy y fechas futuras", () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    expect(validateFutureDate(future.toISOString().slice(0, 10))).toBe(true);
  });
});
