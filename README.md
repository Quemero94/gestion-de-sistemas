# Gestión de Sistemas: CI con GitHub Actions

[![CI](https://github.com/Quemero94/gestion-de-sistemas/actions/workflows/ci.yml/badge.svg)](https://github.com/Quemero94/gestion-de-sistemas/actions/workflows/ci.yml)

SPA de login con una suite de tests end-to-end en **Playwright**. Un workflow de **GitHub Actions** corre los tests en cada Pull Request contra `main` y funciona como *quality gate*: si los tests fallan, la branch protection rule bloquea el merge.

## Estructura

```
.
├── .github/workflows/ci.yml   # Workflow de CI (comentado paso a paso)
├── index.html                 # SPA de login
├── app.js                     # Lógica de la SPA
├── styles.css
├── tests/login.spec.js        # Suite de Playwright
└── playwright.config.js
```

## Correr en local

```bash
npm ci
npx playwright install chromium
npm test            # corre los tests
npm run report      # abre el reporte HTML
npm start           # levanta la app en http://localhost:3000
```

Credenciales de prueba: `admin` / `1234`.

## Pipeline de CI

| Step | Qué hace |
|---|---|
| Checkout | Descarga el código del PR en el runner |
| Setup Node | Instala Node 20 |
| Cache npm | `actions/cache` restaura `~/.npm` según el hash de `package-lock.json` |
| `npm ci` | Instalación estricta de dependencias |
| Playwright install | `npx playwright install --with-deps chromium` |
| Tests | `npx playwright test` en modo headless |
| Artifact | `actions/upload-artifact` publica `playwright-report/` |
