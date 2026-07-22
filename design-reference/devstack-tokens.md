# Tokens DevStack (YOOtheme) — extracción para Horario CIB

**Fecha:** 2026-07-22 · **Fuente:** `SAOProjects/devstack_demo_package_wordpress/wp-content/themes/yootheme/` (tema completo).
Complementa el informe previo de la web (`Web - SAOProjects/palette-preview/informe-devstack.md`), que solo disponía del CSS compilado de la variante por defecto. **El tema completo añade lo que allí faltaba**: los `.less` con los tokens de las 5 variantes (incluidas las oscuras), la librería de iconos UIkit y la tipografía Manrope autoalojada.

Rutas clave dentro del tema:

- Variantes: `vendor/assets/uikit-themes/master-devstack/styles/{light-green,light-orange,light-blue,dark-red,dark-purple}.less`
- Base devstack (variante por defecto): `vendor/assets/uikit-themes/master-devstack/_import.less`
- Iconos (162 SVG 20×20): `vendor/assets/uikit/src/images/icons/`
- Manrope woff2 (500/600/700, 172 KB): `fonts/`

## 1. Paletas por variante

| Token | Default (púrpura) | light-blue | light-green | light-orange | dark-purple | dark-red |
|---|---|---|---|---|---|---|
| Fondo | `#f7f8fc` | `#EDF1FA` | claro | claro | `#303751` | `#1e2225` |
| Fondo muted | `#eceef6` | `#E4EAF7` | — | — | `#2a3049` | — |
| Texto | `#555371` | `#2D3847` | — | — | `rgba(255,255,255,.9)` | `rgba(255,255,255,.9)` |
| Headings | `#0d0a46` | `#223650` | — | — | `#fff` | `#fff` |
| Texto muted | `#747a96` | — | — | — | `rgba(252,252,255,.35)` | — |
| Primario | `#6f40f1` | `#1991EE` | `#65E38F` | `#FF450A` | `#be2af0` | `#ff3b2e` |
| Link | `#6f40f1` | `#1991EE` | `#5AD081` | `#FF450A` | `#a92ae7` | `#e0271a` |
| Borde | `#e5e9ed` | `#e0e5ed` | — | — | `#272c42` | — |
| Secundario/oscuro | `#171258` | `#0C273A` | — | — | `#141826` | — |
| Success | `#32d296` | `#19EEA5` | `#2ADCB2` | — | `#09e07a` | — |
| Danger | `#ff4151` | `#FF4352` | — | — | `#e81898` | — |

**Degradado del botón primario** (51deg, `background-size:200%` + hover deslizando `background-position`):

| Variante | Stops |
|---|---|
| default | `#7141f1 50% → #4d6bd8 75% → #3183e2 100%` |
| light-blue | `#1865E0 50% → #199EF2 80% → #16B6F5 100%` |
| light-green | `#46d4aa 50% → #56dd9a 65% → #72e475 100%` |
| light-orange | `#fe3966 50% → #ff4538 70% → #ff8a42 100%` |
| dark-purple | `#732edf 50% → #a92ae7 75% → #db29f4 100%` |
| dark-red | `#ee3040 50% → #e4212e 65% → #e65522 100%` |

## 2. Receta neumórfica — AHORA TAMBIÉN EN OSCURO

El informe de la web solo pudo extraer las sombras del modo claro. `dark-purple.less` completa la mitad que faltaba. El patrón general es: **brillo arriba-izquierda + sombra abajo-derecha**, y en hover ambas se encogen (el elemento "se hunde").

**Claro (default / light-blue)** — sobre `#f7f8fc`/`#EDF1FA`:

```css
card:      -15px -15px 20px rgba(255,255,255,.8), 15px 15px 20px rgba(57,65,124,.08);
card:hover: -2px  -2px  5px rgba(255,255,255,.9),  2px  2px  4px rgba(57,65,124,.2);   /* + translateY(3px) */
botón:      -5px  -5px 15px rgba(255,255,255,.9),  5px  5px 15px rgba(60,14,189,.3);
input:      inset 3px 3px 6px rgba(57,65,124,.1),  inset -3px -3px 6px #fff;
```

**Oscuro (dark-purple)** — sobre `#303751`; el brillo blanco baja a 3–8 % de opacidad:

```css
global L:   -4px -4px 12px rgba(255,255,255,.03),  4px 4px 12px rgba(0,0,0,.2);
card:      -10px -10px 20px rgba(115,130,190,.08), 10px 10px 20px rgba(27,30,45,.2);
card:hover: -2px  -2px  5px rgba(115,130,190,.08),  2px  2px  4px rgba(27,30,45,.3);
botón prim: -5px  -5px 15px rgba(255,255,255,.04),  5px  5px 15px rgba(0,0,0,.2);
input:      inset 2px 2px 5px rgba(0,0,0,.27), inset -2px -2px 5px rgba(255,255,255,.05);
progress:   track inset 1px 1px 1px rgba(0,0,0,.5), inset -1px -1px 1px rgba(255,255,255,.1);
            barra con degradado 40deg de la marca;
card grad:  linear-gradient(51deg, #303751 0%, #323a52 100%);   /* la card apenas se separa del fondo */
```

## 3. Geometría, tipografía, movimiento y responsive

- Radios: botones e inputs **pastilla** (`500px`, altura 48px) · cards `12px` · detalles `4px`.
- Tipografía: **Manrope** 500/600/700 (woff2 en `manrope/`, 172 KB, con su CSS de `@font-face` ya reescrito a rutas locales). Escala YOOtheme: base 16px/1.5 · h1 44px (desktop) · lead 20px · small/meta 14px.
- Transiciones: cards `.1s ease-in-out`, botones `.2s ease-in-out`; hover de card `translateY(3px)` (hundirse).
- Breakpoints UIkit: `s 640 · m 960 · l 1200 · xl 1600` (los nuestros: 480/768/1024 — no se adoptan).
- Navbar: fondo `rgba(bg,.9)` + `backdrop-filter: blur(5px)` + borde inferior.

## 4. Iconos (`iconos/`)

Subset de 41 SVG de la librería UIkit (20×20, trazo fino) convertidos a `currentColor` (heredan el color del texto, funcionan en claro y oscuro). Relevantes para la app: `calendar, clock, history, pencil, trash, plus, user, users, lock, sign-out, download, file-pdf, file-text, table, list, search, check, close, warning, chevron-*`. Uso: inline en el HTML o como sprite `<symbol>`.

## 5. Qué NO merece la pena portar

- **CSS/LESS tal cual**: todo depende de UIkit (clases `uk-*`, sistema inverse, hooks LESS). Se portan recetas, no archivos.
- **JavaScript**: `assets/site/js/*` son integraciones YOOtheme (mapas, newsletter, consent, vídeo). Nada aplicable; los comportamientos útiles (navbar blur, hover del degradado) son CSS.
- **`css/theme.css` (528 KB)**: ya diseccionado en el informe de la web; solo cubre la variante default.
- Fotos stock del paquete demo.
