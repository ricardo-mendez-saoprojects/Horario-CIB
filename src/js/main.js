/* ─── Horario CIB · main.js ─── */

// ── Toggle de tema (light por defecto; dark persistido en localStorage).
// El atributo se aplica cuanto antes; el snippet inline del <head> ya evitó
// el flash aplicando la clase antes del primer paint.
const themeToggle = document.querySelector('.theme-toggle');

themeToggle?.addEventListener('click', () => {
  const dark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('horario-theme', dark ? 'dark' : 'light');
  themeToggle.setAttribute('aria-pressed', String(dark));
  // Los gráficos leen los tokens al crearse: se les avisa del cambio
  document.dispatchEvent(new CustomEvent('themechange'));
});

// ── Menú móvil
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');

burger?.addEventListener('click', () => {
  const isOpen = links?.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

// ── Enlace activo en la navbar según la página actual
const here = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link').forEach((a) => {
  if (a.getAttribute('href') === here) a.classList.add('active');
});
