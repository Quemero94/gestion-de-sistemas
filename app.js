// SPA mínima: alterna entre la vista de login y la vista de inicio sin recargar la página.
const USUARIO_VALIDO = 'admin';
const PASSWORD_VALIDA = '1234';

const loginView = document.getElementById('login-view');
const homeView = document.getElementById('home-view');
const form = document.getElementById('login-form');
const error = document.getElementById('error');
const bienvenida = document.getElementById('bienvenida');

function mostrarError(mensaje) {
  error.textContent = mensaje;
  error.hidden = false;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = form.usuario.value.trim();
  const password = form.password.value;

  if (!usuario || !password) {
    mostrarError('Completá usuario y contraseña');
    return;
  }
  if (usuario !== USUARIO_VALIDO || password !== PASSWORD_VALIDA) {
    mostrarError('Usuario o contraseña incorrectos');
    return;
  }

  error.hidden = true;
  bienvenida.textContent = `Bienvenido, ${usuario}`;
  loginView.hidden = true;
  homeView.hidden = false;
});

document.getElementById('logout').addEventListener('click', () => {
  form.reset();
  homeView.hidden = true;
  loginView.hidden = false;
});
