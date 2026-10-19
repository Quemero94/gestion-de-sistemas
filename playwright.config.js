// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  // Timeouts cortos: la app es chica, así un test roto falla rápido en el PR.
  timeout: 15_000,
  expect: { timeout: 3_000 },
  // En CI no se permite dejar un test.only olvidado.
  forbidOnly: !!process.env.CI,
  // En CI se reintenta una vez por si hay un fallo intermitente.
  retries: process.env.CI ? 1 : 0,
  // Reporte HTML en ./playwright-report (es lo que se publica como artifact).
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:3000',
    actionTimeout: 3_000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  // Levanta un servidor estático con la SPA antes de correr los tests.
  webServer: {
    command: 'npx http-server . -p 3000 -s',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
