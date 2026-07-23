import { describe, expect, it } from "vitest";
import { capitalize, formatDate, formatPrice, toSlug, truncateText } from "./formatters";

describe("formatPrice", () => {
  it("formatea un número como precio con la moneda dada", () => {
    const result = formatPrice(950, "USD");
    expect(result).toContain("950");
  });
});

describe("formatDate", () => {
  it("formatea una fecha ISO a texto legible", () => {
    const result = formatDate("2026-01-15");
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/enero/i);
  });
});

describe("truncateText", () => {
  it("no modifica textos más cortos que el límite", () => {
    expect(truncateText("hola", 10)).toBe("hola");
  });

  it("trunca y agrega puntos suspensivos", () => {
    expect(truncateText("hola mundo", 4)).toBe("hola...");
  });
});

describe("capitalize", () => {
  it("pone en mayúscula la primera letra", () => {
    expect(capitalize("suite")).toBe("Suite");
  });
});

describe("toSlug", () => {
  it("convierte texto a slug en minúsculas separado por guiones", () => {
    expect(toSlug("Suite Presidencial!")).toBe("suite-presidencial");
  });
});
