# CUBANGABRILAND 2026 — Web oficial

Landing page completa para el evento privado CUBANGABRILAND 2026.

## Árbol de archivos

```
cubangabriland2026/
├── index.html       # HTML principal (single-page)
├── style.css        # Estilos completos
├── script.js        # Countdown, partículas, scroll, nav
├── assets/          # Carpeta para imágenes futuras
└── README.md        # Este archivo
```

## Desplegar en GitHub Pages

### Opción 1 — Repositorio nuevo (recomendada)

1. Crea un repositorio en GitHub llamado `cubangabriland2026` (o cualquier nombre).
2. En tu terminal, desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: CUBANGABRILAND 2026 landing page"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/cubangabriland2026.git
git push -u origin main
```

3. Ve a **Settings → Pages** en tu repositorio.
4. En "Source", selecciona **main** / **(root)** y guarda.
5. En ~30 segundos estará en: `https://TU_USUARIO.github.io/cubangabriland2026/`

### Opción 2 — Repositorio `usuario.github.io`

Si quieres que la URL sea `https://TU_USUARIO.github.io/`:

1. Crea el repositorio con el nombre exacto: `TU_USUARIO.github.io`
2. Sube los archivos como en la opción 1.
3. GitHub Pages lo activará automáticamente.

## Personalización rápida

| Qué cambiar            | Dónde                         |
|------------------------|-------------------------------|
| Colores principales    | `:root` en `style.css`       |
| Fecha del evento       | Variable `EVENT_DATE` en `script.js` |
| Textos                 | `index.html`, secciones correspondientes |
| Email de contacto      | CTA final en `index.html` (`href="mailto:..."`) |
| Imágenes de galería    | Sustituir `.galeria-placeholder` con `<img>` reales |

## Mejoras opcionales futuras

- Añadir imágenes reales del evento en `/assets/` y referenciarlas en la galería
- Conectar el botón "Solicitar invitación" a un formulario de Google Forms o Typeform
- Añadir música de fondo con autoplay (con control mute visible)
- Crear una versión "post-evento" con galería de fotos del fotógrafo oficial
- Añadir un modal lightbox para la galería
- Integrar Google Maps embed en la sección de datos
- Añadir meta tag `og:image` con imagen real del cartel
