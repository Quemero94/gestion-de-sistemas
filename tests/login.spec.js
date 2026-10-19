// @ts-check
const { test, expect } = require('@playwright/test');

// Los tests buscan los elementos por su rol de accesibilidad y su nombre visible.
// Si alguien cambia el texto del botón "Iniciar sesión", el contrato se rompe y el test falla.

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('muestra el formulario de login', async ({ page }) => {
  await expect(page.getByRole('heading', { name: 'Gestión de Sistemas' })).toBeVisible();
  await expect(page.getByLabel('Usuario')).toBeVisible();
  await expect(page.getByLabel('Contraseña')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
});

test('login exitoso con credenciales válidas', async ({ page }) => {
  await page.getByLabel('Usuario').fill('admin');
  await page.getByLabel('Contraseña').fill('1234');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await expect(page.getByRole('heading', { name: 'Bienvenido, admin' })).toBeVisible();
});

test('muestra error con credenciales inválidas', async ({ page }) => {
  await page.getByLabel('Usuario').fill('admin');
  await page.getByLabel('Contraseña').fill('mal');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await expect(page.getByRole('alert')).toHaveText('Usuario o contraseña incorrectos');
});

test('muestra error si los campos están vacíos', async ({ page }) => {
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();

  await expect(page.getByRole('alert')).toHaveText('Completá usuario y contraseña');
});

test('cerrar sesión vuelve al login', async ({ page }) => {
  await page.getByLabel('Usuario').fill('admin');
  await page.getByLabel('Contraseña').fill('1234');
  await page.getByRole('button', { name: 'Iniciar sesión' }).click();
  await page.getByRole('button', { name: 'Cerrar sesión' }).click();

  await expect(page.getByRole('button', { name: 'Iniciar sesión' })).toBeVisible();
});
