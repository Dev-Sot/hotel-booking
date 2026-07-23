import { expect, test, type Page } from "@playwright/test";

/**
 * El login mock tiene dos mitades: localStorage (lo que lee AuthContext en
 * el cliente) y una cookie httpOnly (lo que lee el middleware en el
 * servidor). Solo pasan ambas si se dispara el flujo real de la UI —por
 * eso este helper hace click de verdad en "Continuar con Google" en vez de
 * llamar a /api/mock-auth directamente.
 */
async function loginMock(page: Page) {
  await page.goto("/login");
  await page.getByRole("button", { name: /Continuar con Google/i }).click();
  await page.waitForURL(/\/admin/, { timeout: 5000 });
}

test.describe("con sesión mock activa", () => {
  test.beforeEach(async ({ page }) => {
    await loginMock(page);
  });

  test("el panel de admin muestra el CRUD de habitaciones", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Panel de Administración" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Habitaciones" })).toBeVisible();
    await expect(page.getByRole("button", { name: "+ Nueva habitación" })).toBeVisible();
  });

  test("crear una habitación sin Supabase configurado muestra un error honesto", async ({ page }) => {
    await page.getByRole("button", { name: "+ Nueva habitación" }).click();
    await page.getByLabel("Título").fill("Habitación de prueba");
    await page.getByLabel("Precio por noche").fill("100");
    await page.getByRole("button", { name: "Guardar" }).click();
    await expect(page.getByText(/Supabase no está configurado/i)).toBeVisible();
  });

  test("Mis Reservas muestra un estado vacío honesto en modo demo", async ({ page }) => {
    await page.goto("/reservas");
    await expect(page.getByRole("heading", { name: "Mis Reservas" })).toBeVisible();
    await expect(page.getByText("No tienes reservas")).toBeVisible();
  });
});
