/* -------------------------------------------------------
   1. VARIABLES Y REFERENCIAS AL DOM
------------------------------------------------------- */
const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const visitorNameInput = document.getElementById('visitor-name');
const saveNameBtn = document.getElementById('save-name-btn');
const visitorGreeting = document.getElementById('visitor-greeting');

const skillCards = document.querySelectorAll('.skill-card');

const favoriteButtons = document.querySelectorAll('.favorite-btn');

const contactForm = document.getElementById('contact-form');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const mensajeInput = document.getElementById('mensaje');
const formConfirmation = document.getElementById('form-confirmation');

const visitCountSpan = document.getElementById('visit-count');
const backToTopBtn = document.getElementById('back-to-top');
const yearSpan = document.getElementById('year');

/* -------------------------------------------------------
   2. MODO OSCURO / CLARO (funcionalidad adicional + localStorage)
------------------------------------------------------- */
function aplicarTema(tema) {
  // Estructura condicional: si el tema es "light" se agrega la clase,
  // caso contrario se remueve y se mantiene el modo oscuro por defecto.
  if (tema === 'light') {
    body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
    themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
  } else {
    body.classList.remove('light-theme');
    themeIcon.textContent = '🌙';
    themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
  }
}

function alternarTema() {
  const temaActual = localStorage.getItem('theme') || 'dark';
  const nuevoTema = temaActual === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', nuevoTema);
  aplicarTema(nuevoTema);
}

// Evento 1: click en el botón de tema
themeToggleBtn.addEventListener('click', alternarTema);

// Al cargar la página se recupera y aplica el tema guardado (localStorage)
aplicarTema(localStorage.getItem('theme') || 'dark');

/* -------------------------------------------------------
   3. SALUDO PERSONALIZADO (localStorage)
------------------------------------------------------- */
function mostrarSaludo(nombre) {
  if (nombre) {
    visitorGreeting.textContent = `¡Qué gusto verte de nuevo, ${nombre}! 👋`;
  } else {
    visitorGreeting.textContent = '';
  }
}

function guardarNombreVisitante() {
  const nombre = visitorNameInput.value.trim();

  if (nombre === '') {
    visitorGreeting.textContent = 'Escribe un nombre antes de guardar.';
    return;
  }

  localStorage.setItem('visitorName', nombre);
  mostrarSaludo(nombre);
  visitorNameInput.value = '';
}

// Evento 2: click en el botón "Guardar" del saludo
saveNameBtn.addEventListener('click', guardarNombreVisitante);

// Recuperar el nombre guardado al cargar la página
const nombreGuardado = localStorage.getItem('visitorName');
if (nombreGuardado) {
  mostrarSaludo(nombreGuardado);
}

/* -------------------------------------------------------
   4. EFECTO EN TARJETAS DE HABILIDADES (mouseover / mouseout)
------------------------------------------------------- */
skillCards.forEach(function (card) {
  const tag = card.querySelector('.skill-tag');

  card.addEventListener('mouseover', function () {
    tag.textContent = tag.dataset.hover; // Manipulación del DOM: cambia el texto
  });

  card.addEventListener('mouseout', function () {
    tag.textContent = tag.dataset.default; // Restaura el texto original
  });
});

/* -------------------------------------------------------
   5. PROYECTOS FAVORITOS (localStorage)
------------------------------------------------------- */
function obtenerFavoritos() {
  const favoritos = localStorage.getItem('favoriteProjects');
  return favoritos ? JSON.parse(favoritos) : [];
}

function guardarFavoritos(listaFavoritos) {
  localStorage.setItem('favoriteProjects', JSON.stringify(listaFavoritos));
}

function actualizarBotonFavorito(boton, esFavorito) {
  // Estructura condicional para decidir ícono y clases del botón
  if (esFavorito) {
    boton.textContent = '★';
    boton.classList.add('is-active');
    boton.closest('.project-card').classList.add('is-favorite');
  } else {
    boton.textContent = '☆';
    boton.classList.remove('is-active');
    boton.closest('.project-card').classList.remove('is-favorite');
  }
}

function alternarFavorito(evento) {
  const boton = evento.currentTarget;
  const tarjeta = boton.closest('.project-card');
  const idProyecto = tarjeta.dataset.projectId;

  let favoritos = obtenerFavoritos();

  if (favoritos.includes(idProyecto)) {
    favoritos = favoritos.filter(function (id) {
      return id !== idProyecto;
    });
    actualizarBotonFavorito(boton, false);
  } else {
    favoritos.push(idProyecto);
    actualizarBotonFavorito(boton, true);
  }

  guardarFavoritos(favoritos);
}

// Evento 3: click en cada botón de favorito
favoriteButtons.forEach(function (boton) {
  boton.addEventListener('click', alternarFavorito);
});

// Al cargar la página, marcar los proyectos que ya eran favoritos
const favoritosGuardados = obtenerFavoritos();
favoriteButtons.forEach(function (boton) {
  const idProyecto = boton.closest('.project-card').dataset.projectId;
  if (favoritosGuardados.includes(idProyecto)) {
    actualizarBotonFavorito(boton, true);
  }
});

/* -------------------------------------------------------
   6. BORRADOR AUTOMÁTICO DEL FORMULARIO (input + localStorage)
------------------------------------------------------- */
function guardarBorrador() {
  const borrador = {
    nombre: nombreInput.value,
    correo: correoInput.value,
    mensaje: mensajeInput.value
  };
  localStorage.setItem('contactDraft', JSON.stringify(borrador));
}

function restaurarBorrador() {
  const datosGuardados = localStorage.getItem('contactDraft');

  if (!datosGuardados) {
    return;
  }

  const borrador = JSON.parse(datosGuardados);
  nombreInput.value = borrador.nombre || '';
  correoInput.value = borrador.correo || '';
  mensajeInput.value = borrador.mensaje || '';
}

// Evento 4, 5 y 6: input en cada campo del formulario
nombreInput.addEventListener('input', guardarBorrador);
correoInput.addEventListener('input', guardarBorrador);
mensajeInput.addEventListener('input', guardarBorrador);

restaurarBorrador();

/* -------------------------------------------------------
   7. VALIDACIÓN DEL FORMULARIO DE CONTACTO
------------------------------------------------------- */
function mostrarError(input, mensajeError) {
  const error = document.getElementById('error-' + input.id);
  error.textContent = mensajeError;
  input.classList.add('input-error');
}

function limpiarError(input) {
  const error = document.getElementById('error-' + input.id);
  error.textContent = '';
  input.classList.remove('input-error');
}

function validarFormulario(evento) {
  evento.preventDefault(); // Evita que la página se recargue

  let formularioValido = true;

  // Validar nombre
  if (nombreInput.value.trim() === '') {
    mostrarError(nombreInput, 'El nombre no puede estar vacío.');
    formularioValido = false;
  } else {
    limpiarError(nombreInput);
  }

  // Validar correo
  if (correoInput.value.trim() === '') {
    mostrarError(correoInput, 'El correo no puede estar vacío.');
    formularioValido = false;
  } else {
    limpiarError(correoInput);
  }

  // Validar mensaje
  if (mensajeInput.value.trim() === '') {
    mostrarError(mensajeInput, 'El mensaje no puede estar vacío.');
    formularioValido = false;
  } else {
    limpiarError(mensajeInput);
  }

  if (formularioValido) {
    formConfirmation.hidden = false;
    contactForm.reset();
    localStorage.removeItem('contactDraft');

    // Ocultar el mensaje de confirmación después de unos segundos
    setTimeout(function () {
      formConfirmation.hidden = true;
    }, 4000);
  } else {
    formConfirmation.hidden = true;
  }
}

// Evento 7: submit del formulario
contactForm.addEventListener('submit', validarFormulario);

/* -------------------------------------------------------
   8. CONTADOR DE VISITAS SIMULADO (localStorage)
------------------------------------------------------- */
function registrarVisita() {
  let visitas = localStorage.getItem('visitCount');
  visitas = visitas ? parseInt(visitas, 10) + 1 : 1;
  localStorage.setItem('visitCount', visitas);
  visitCountSpan.textContent = visitas;
}

registrarVisita();

/* -------------------------------------------------------
   9. BOTÓN "VOLVER AL INICIO"
------------------------------------------------------- */
function alternarVisibilidadBoton() {
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('is-visible');
  } else {
    backToTopBtn.classList.remove('is-visible');
  }
}

// Evento 8: scroll de la ventana
window.addEventListener('scroll', alternarVisibilidadBoton);

// Evento 9: click en el botón de volver arriba
backToTopBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* -------------------------------------------------------
   10. AÑO DINÁMICO EN EL PIE DE PÁGINA
------------------------------------------------------- */
yearSpan.textContent = new Date().getFullYear();

