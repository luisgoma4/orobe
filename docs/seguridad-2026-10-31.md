# Seguridad: revisión del 2026-10-31

Contexto: revisión de seguridad de todos los repos tras el «octubre negro» (la IA abarata el ataque: se asume que todo repo, endpoint y clave se escanea en minutos). Este documento recoge lo aplicado a este repo y lo que queda pendiente; el estado vive en `docs/`, no en la conversación.

> Repo **público**: los pendientes se describen por categoría y acción, sin detalles explotables.

## Cambios aplicados

Ninguno en esta tanda.

## Pendientes

- [ ] **Media** · Raíz (E-27): Sin `.gitignore`: añadir uno mínimo (`.env*`, `*.pem`, `.DS_Store`, exports).
- [ ] **Baja** · `index.html`, `style.css` (OR-01): Fuentes de Google cargadas desde el CDN (fuga de IP de visitantes, RGPD) y sin CSP. Autoalojar las fuentes y añadir `<meta http-equiv="Content-Security-Policy">`.
- [ ] **Baja** · `js/animations.js` (OR-02): Sustituir el uso de `innerHTML` por nodos de texto y elementos creados con DOM, antes de que llegue texto externo.
- [ ] **Info** · Metadatos de commit (E-26): Usar el email `noreply` de GitHub en commits futuros y activar «Block command line pushes that expose my email».

## Reglas nuevas para agentes de este repo

- .gitignore base: `.env*`, `*.pem`, `*.key`, `*.sqlite*`, `*.db`, `.wrangler/`, y `*.xlsx`/`*.docx`/`*.pdf` en repos con material de cliente. Ejecutar `gitleaks detect --log-opts=--all` antes de hacer público un repo.
- En repos públicos, commits con el email `noreply` de GitHub.
- Antes de añadir formularios, analítica o terceros: CSP, SRI y revisión de privacidad.
- Dependabot (npm y github-actions) y alertas de seguridad activas, incluso en repos estáticos.
