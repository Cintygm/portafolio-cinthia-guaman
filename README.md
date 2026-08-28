# Portafolio Personal

**Estudiante:** Cinthia Marisol Guamán Montaño
**Carrera:** Sistemas Inteligentes — Universidad Tecnológica ECOTEC

## Descripción

Portafolio personal desarrollado con HTML, CSS y JavaScript. Presenta información
básica sobre mí, mis habilidades, los proyectos que he realizado durante mi formación
y una sección de contacto. En esta segunda actividad se incorporó JavaScript para
hacer el sitio más dinámico e interactivo, incluyendo persistencia de datos con
`localStorage`.

## Nuevas funcionalidades implementadas con JavaScript (Actividad Integradora 2)

- **Modo oscuro / claro:** un botón en el encabezado permite alternar el tema visual
  del sitio. La preferencia se guarda en `localStorage` y se aplica automáticamente
  al volver a abrir la página.
- **Saludo personalizado:** el visitante puede escribir su nombre en la sección de
  inicio; el nombre se guarda en `localStorage` y se muestra un saludo personalizado
  en visitas posteriores.
- **Efecto interactivo en habilidades:** al pasar el mouse sobre cada tarjeta de
  habilidades (`mouseover` / `mouseout`) el ícono cambia dinámicamente mediante
  manipulación del DOM.
- **Proyectos favoritos:** cada tarjeta de proyecto tiene un botón de favorito (★/☆).
  La selección se guarda en `localStorage` como una lista y se mantiene marcada
  después de recargar la página.
- **Borrador automático del formulario:** mientras se escribe en el formulario de
  contacto (evento `input`), los datos se guardan temporalmente en `localStorage` y
  se restauran si el usuario recarga la página antes de enviarlo.
- **Validación del formulario de contacto:** al enviar el formulario (evento
  `submit`) se valida que los campos nombre, correo y mensaje no estén vacíos.
  Si falta algún dato se muestran mensajes de error; si todo es correcto se muestra
  un mensaje de confirmación y se limpia el borrador guardado.
- **Contador de visitas simulado:** cada vez que se carga la página, un contador
  almacenado en `localStorage` se incrementa y se muestra en el pie de página.
- **Botón "Volver al inicio":** aparece al hacer scroll hacia abajo y permite
  regresar suavemente al inicio de la página.
- **Año dinámico:** el año que aparece en el pie de página se genera automáticamente
  con JavaScript.

## Tecnologías utilizadas

- HTML5 (etiquetas semánticas: `header`, `nav`, `main`, `section`, `article`, `footer`)
- CSS3 (variables en `:root`, Flexbox, pseudoclase `:hover`, tema claro/oscuro)
- JavaScript (ES6): variables, funciones, condicionales, eventos con
  `addEventListener`, manipulación del DOM y `localStorage`
- Git y GitHub

## Estructura del proyecto

```
portafolio-cinthia-guaman/
├── index.html
├── styles.css
├── script.js
├── img/
│   ├── avatar.svg
│   ├── proyecto1.svg
│   ├── proyecto2.svg
│   └── proyecto3.svg
└── README.md
```


