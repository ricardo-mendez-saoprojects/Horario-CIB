# Horario CIB — Frontend

Previews del frontend de la app de registro de jornada del CIB (demo visual sin backend). Reconstruido sin Bootstrap con un sistema de diseño propio (tokens CSS, tema claro por defecto + modo oscuro), siguiendo la misma arquitectura que `Web - SAOProjects`.

## Arranque

Los HTML se abren directamente (o con cualquier servidor estático) sin compilar nada: `public/build/` está versionado, así que basta con clonar y abrir `index.html`.

Para tocar los estilos o el JS:

```bash
npm install
npm run dev      # compila SCSS/JS y vigila cambios (sin minificar, con sourcemaps)
npm run build    # build de producción, minificada
```

**Antes de commitear cambios de `src/`, ejecuta `npm run build`**: los HTML consumen `public/build/css/app.css` y `public/build/js/*.min.js`, y esa carpeta viaja en el repo para que la demo se pueda ver online sin instalar nada. Si dejas `npm run dev` corriendo, su watcher sobrescribe la salida con la versión de desarrollo.

## Estructura

```
src/scss/
  base/      tokens (_variables), reset, globales, tipografía, mixins
  ui/        componentes: nav, botones, cards, tablas, formularios, badges,
             alertas, paginación, progress, calendario (FullCalendar), animaciones
  paginas/   estilos específicos: auth, dashboard, registros, admin
src/js/
  main.js    toggle de tema (localStorage), menú móvil, enlace activo
  charts.js  helper de Chart.js tematizado con los tokens
public/build/  salida de gulp (no se versiona)
```

## Páginas

| Página | Contenido |
|---|---|
| `index.html` | Redirección a login |
| `login.html` / `register.html` | Autenticación (layout `auth`) |
| `dashboard.html` | Stats semana/mes/año, gráfica, resúmenes |
| `logs.html` | Calendario, festivos/vacaciones, resúmenes e histórico |
| `log-form.html` | Alta/edición de registro |
| `change-password.html` | Cambio de contraseña |
| `admin-users.html` | Administración de usuarios (solo admin) |
| `error.html` | Página de error |

## Sistema de diseño

- Tokens en `src/scss/base/_variables.scss`: light en `:root`, dark en `body.dark-mode`. Contrastes AA documentados en el propio archivo.
- **Acabado neumórfico DevStack** (extraído del tema YOOtheme, ver `design-reference/devstack-tokens.md`): la superficie es del mismo tono que el fondo y el relieve lo hacen las sombras duales; inputs "hundidos" (inset), botones pastilla con degradado que se desliza en hover, cards que se hunden al pasar el ratón (salvo las que contienen tablas).
- Tipografía: Archivo (títulos) + Public Sans (cuerpo), numerales tabulares en todos los datos de tiempo.
- Los balances se muestran como chips (`.balance--pos/neg/zero`); las barras de progreso llevan una muesca en el 100 % del objetivo y el degradado de marca.
- Iconos: subset UIkit en `currentColor` (sprite inline por página; catálogo completo en `design-reference/iconos/`).
- FullCalendar y Chart.js se cargan por CDN solo en las páginas que los usan y leen los colores de los tokens.
