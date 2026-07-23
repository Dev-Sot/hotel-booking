import { describe, expect, it } from "vitest";
import { addDays, daysBetween, isSameDay } from "./dateHelpers";

describe("daysBetween", () => {
  it("calcula la cantidad de noches entre dos fechas", () => {
    expect(daysBetween("2026-01-10", "2026-01-15")).toBe(5);
  });

  it("es simétrico sin importar el orden de los argumentos", () => {
    expect(daysBetween("2026-01-15", "2026-01-10")).toBe(5);
  });
});

describe("addDays", () => {
  it("suma días a una fecha", () => {
    const result = addDays("2026-01-10", 5);
    expect(result.toISOString().slice(0, 10)).toBe("2026-01-15");
  });
});

describe("isSameDay", () => {
  it("reconoce el mismo día aunque cambie la hora", () => {
    expect(isSameDay("2026-01-10T08:00:00", "2026-01-10T20:00:00")).toBe(true);
  });

  it("distingue días diferentes", () => {
    expect(isSameDay("2026-01-10", "2026-01-11")).toBe(false);
  });
});
