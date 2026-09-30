# Non Plus Ultra · Portfolio

Réplica funcional de la interfaz del portfolio de **Non Plus Ultra** a partir de
`md/configure.md`. HTML5 + CSS3 + JavaScript vanilla, **sin build, sin dependencias
y sin servidor**: se abre con doble clic en `index.html`.

## Estructura

```
index.html                  Estructura y contenido estático
assets/css/styles.css       Estilo completo (10 capas, ver comentarios)
assets/js/data.js           Catálogo de 207 piezas — ÚNICA fuente de datos
assets/js/app.js            Paginación, lightbox y menú móvil
assets/img/logo.svg         Logotipo del header (434×200, fondo transparente)
assets/img/placeholders/    Placas SVG de marcador para piezas sin imagen real
assets/img/portfolio/       Imágenes reales, organizadas por proyecto y pieza
md/configure.md             Guía de replicación original
```

## Dónde se cambia cada cosa

| Quiero… | Edito |
|---|---|
| Agregar/quitar piezas | `assets/js/data.js` → los pools de `GRUPOS` |
| Cambiar el diseño | `assets/css/styles.css` |
| Poner fotos reales | `assets/img/portfolio/<proyecto>/` y el campo `imagen` de cada pieza |

El contador de resultados se calcula a partir de `data.js`: no hay números
escritos a mano en la UI, así que si cambiás el catálogo se actualiza solo.

## Decisiones sobre la guía original

1. **Conteos corregidos.** La guía listaba `CONCEPTUAL · 18`; con UGC 33 + Producto
   19 + B-Roll 15 + Arquitectura 125 + Conceptual 18 el total da **210**, no 207.
   Se ajustó Conceptual a **15** para que la matriz cierre en 207.

2. **`src` de imágenes corregido.** El código original traía
   `src="[url](url)"` (sintaxis de markdown filtrada): es una URL inválida y
   ninguna imagen cargaba. Además usaba `via.placeholder.com`, una dependencia
   externa; se reemplazó por placas SVG locales para que el sitio funcione
   sin internet.

3. **Barra de filtros eliminada.** La guía la pedía con 4 selectores, pero se
   decidió quitarla: el archivo se recorre linealmente, con paginación de 24 por
   página. Si vuelve a hacer falta, se recupera del `md/configure.md`.

4. **Navegación móvil.** El original ocultaba la navegación completa en ≤768px,
   dejando sólo la home. Se agregó un panel móvil con los enlaces y el CTA.

5. **Tipografía.** Se carga *Archivo* + *Space Mono* desde Google Fonts, con
   fallback a system (`--font-sans` / `--font-mono`). Para un sitio 100% sin
   requests externos, borrar los 3 `<link>` de fuentes del `<head>`: el diseño
   se mantiene con las fuentes del sistema.

   ## Jerarquía de imágenes

   Las imágenes reales se agregan dentro de `assets/img/portfolio/`, separadas por
   proyecto:

   ```text
   assets/img/
   ├── placeholders/           # Placas SVG temporales del catálogo
   └── portfolio/
      ├── beta-chevrolet/
      ├── chery/
      ├── conceptual/
      ├── manu-berraz/
      └── ugc-klinkify/
   ```

   Usá nombres en minúscula, sin espacios ni acentos, por ejemplo
   `assets/img/portfolio/chery/tiggo-4-01.webp`. Luego reemplazá el valor
   `imagen` de la pieza correspondiente en `assets/js/data.js`. Se recomiendan
   `webp` o `avif` para imágenes y `mp4` para videos; las placas SVG se mantienen
   como respaldo mientras no exista un archivo real.

## Diferencias de diseño respecto del snippet base

- **Header sticky** con blur: en el estado inicial es idéntico, pero con 207
  piezas conviene no perder el CTA al hacer scroll.
- **Retícula**: las marcas `+` viven en el canal exterior del contenedor, así que
  se ocultan por debajo de 768px donde no hay holgura para dibujarlas.
- **Lightbox** de detalle con la ficha técnica (proyecto, material, duración,
  resolución, fecha, QA). El snippet original dejaba las cards con
  `cursor:pointer` sin ninguna acción asociada.
- **Accesibilidad**: skip link, `aria-live` en el contador, foco visible, teclado
  (Enter/Espacio abre el detalle, Escape cierra), `prefers-reduced-motion` y
  `loading="lazy"` en las miniaturas.

## Verificación

Probado renderizando el sitio en Edge headless: 0 selectores en el DOM, contador
`207 RESULTADOS`, paginación (24 → 48 → 96), lightbox con índice correcto tras
cargar páginas, 97 imágenes sin roturas y layout a 1500 px. Sin errores de
JavaScript.
