import { expect, test } from "@playwright/test";

test("el home carga y muestra el hero", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Hotel Booking" })).toBeVisible();
});

test("Habitaciones muestra el catálogo (modo demo sin Supabase)", async ({ page }) => {
  await page.goto("/habitaciones");
  await expect(page.getByRole("heading", { name: "Nuestras Habitaciones" })).toBeVisible();
  await expect(page.getByText("Modo demo", { exact: false })).toBeVisible();
  await expect(page.getByText("Suite Presidencial")).toBeVisible();
});

test("reservar sin sesión pide iniciar sesión con Google", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Reservar ahora" }).click();
  await expect(page.getByText("Inicia sesión para reservar")).toBeVisible();
});

test("las rutas protegidas redirigen a /login sin sesión", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login/);

  await page.goto("/reservas");
  await expect(page).toHaveURL(/\/login/);
});
