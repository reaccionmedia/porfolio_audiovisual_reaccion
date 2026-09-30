# Guía de Replicación Técnica: Non Plus Ultra - Portfolio

Este documento contiene el desglose estructural, análisis de componentes y el código fuente base en HTML5 y CSS3 para replicar de forma idéntica la interfaz web del portfolio de **Non Plus Ultra**.

---

## 1. Análisis de Estructura y Estética Visual

### 1.1 Esquema de Color y Tipografía
- **Fondo Principal:** Negro absoluto (`#000000` / `#0A0A0A`).
- **Texto y Elementos Contenedores:** 
  - Texto principal: Blanco puro (`#FFFFFF`).
  - Texto secundario/deshabilitado: Gris tenue (`#888888` / `#666666`).
  - Líneas de retícula (Grid Lines): Gris oscuro muy fino (`#1A1A1A` / `#222222`).
- **Tipografía:**
  - Encabezados e Identidad: Sans-serif geométrica / Display moderna de caja alta (`sans-serif`, peso ultra bold / condensado para el título principal).
  - Cuerpo y Filtros: Monospaced / Sans-serif técnica de caja alta (`monospace` o `Consolas`, `Courier New`).

### 1.2 Layout y Grilla
- **Estructura Modular (Grid/Brutalist Aesthetic):** El sitio utiliza una retícula visible de líneas delgadas que intersectan la pantalla en filas y columnas horizontales y verticales.
- **Micro-interacciones:** Cruces en forma de más (`+`) situadas sobre las intersecciones clave de las líneas de la retícula.
- **Encabezado (Header):**
  - Izquierda: Logotipo e isotipo de marca.
  - Centro: Navegación horizontal en caja alta (`INICIO`, `PORTFOLIO`, `BLOG`, `CONTACTO`).
  - Derecha: Botón Call to Action (`AGENDAR VISITA →`).
- **Sección Hero:**
  - Etiqueta de archivo: `ARCHIVO DE PRODUCCIÓN / MMXXVI`.
  - H1 Principal: `PORTFOLIO` en tipografía Gigante de caja alta.
  - Descripción: Párrafo en tipografía técnica explicativa sobre producción con IA y QA humano.
  - Subetiquetas/Tags: `CALIDAD / QA HUMANO`, `CONTINUIDAD VISUAL`, `WHITE LABEL DISPONIBLE`.
- **Barra de Filtros:**
  - 4 Selectores desplegables organizados en celdas cuadriláteras:
    1. **TIPO DE ARCHIVO** (Todo, Imágenes, Videos).
    2. **PROYECTO** (Desplegable con 207 resultados).
    3. **MATERIAL** (UGC, Producto, B-Roll, Arquitectura, Conceptual, etc.).
    4. **ORDENAR POR** (Por defecto, Más reciente, Más viejo).
- **Galería de Contenidos (Grid Portfolio):**
  - Malla de cards/miniaturas dinámicas que muestran contenido generado (Imágenes y Vídeos) con efecto hover y etiquetas técnicas en cada miniatura.
- **Pie de Página (Footer):**
  - Banner de cierre de producción (`¿TENÉS UNA IDEA? LLEVÉMOSLA A PRODUCCIÓN`).
  - Información de contacto (`NONPLUSULTRACREATIVE@GMAIL.COM`, `+54 11 2326 9868`, `BUENOS AIRES, ARGENTINA`).
  - Copyright y lema de marca (`LUXUS EST POTESTAS`).

---

## 2. Código Fuente para Replicación (HTML5 + CSS3)

Guarda el siguiente código en un archivo llamado `index.html`:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio · Non Plus Ultra</title>
    <style>
        /* --- RESET & VARIABLES --- */
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        :root {
            --bg-color: #050505;
            --border-color: #1e1e1e;
            --text-primary: #ffffff;
            --text-secondary: #888888;
            --font-sans: 'Helvetica Neue', Arial, sans-serif;
            --font-mono: 'Courier New', Courier, monospace;
        }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: var(--font-mono);
            text-transform: uppercase;
            overflow-x: hidden;
            line-height: 1.4;
        }

        /* --- RETÍCULA VISUAL (GRID LINES) --- */
        .grid-container {
            border-left: 1px solid var(--border-color);
            border-right: 1px solid var(--border-color);
            max-width: 1400px;
            margin: 0 auto;
            position: relative;
        }

        .plus-mark {
            position: absolute;
            color: var(--text-secondary);
            font-size: 12px;
            line-height: 1;
            user-select: none;
        }

        /* --- HEADER & NAVEGACIÓN --- */
        header {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            border-bottom: 1px solid var(--border-color);
            padding: 20px;
            align-items: center;
        }

        .logo {
            font-family: var(--font-sans);
            font-weight: 900;
            font-size: 1.2rem;
            letter-spacing: -0.5px;
        }

        nav ul {
            display: flex;
            justify-content: center;
            gap: 30px;
            list-style: none;
        }

        nav a, .cta-btn {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 0.85rem;
            letter-spacing: 1px;
            transition: opacity 0.2s;
        }

        nav a:hover, .cta-btn:hover {
            opacity: 0.6;
        }

        .cta-container {
            text-align: right;
        }

        /* --- HERO SECTION --- */
        .hero {
            padding: 60px 20px 40px 20px;
            border-bottom: 1px solid var(--border-color);
            position: relative;
        }

        .archive-tag {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
            display: block;
        }

        .hero h1 {
            font-family: var(--font-sans);
            font-size: clamp(3rem, 10vw, 7.5rem);
            font-weight: 900;
            letter-spacing: -2px;
            line-height: 0.9;
            margin-bottom: 30px;
        }

        .hero-description {
            max-width: 500px;
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-bottom: 40px;
        }

        .hero-tags {
            display: flex;
            gap: 20px;
            font-size: 0.7rem;
            color: var(--text-secondary);
        }

        /* --- BARRA DE FILTROS --- */
        .filter-bar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            border-bottom: 1px solid var(--border-color);
        }

        .filter-group {
            padding: 15px 20px;
            border-right: 1px solid var(--border-color);
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .filter-group:last-child {
            border-right: none;
        }

        .filter-group label {
            font-size: 0.65rem;
            color: var(--text-secondary);
        }

        .filter-group select {
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            padding: 8px 12px;
            font-family: var(--font-mono);
            font-size: 0.8rem;
            outline: none;
            cursor: pointer;
            width: 100%;
        }

        /* --- SECCIÓN DE RESULTADOS / GALERÍA --- */
        .results-meta {
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            font-size: 0.75rem;
            color: var(--text-secondary);
            border-bottom: 1px solid var(--border-color);
        }

        .portfolio-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1px;
            background-color: var(--border-color);
        }

        .portfolio-card {
            background-color: var(--bg-color);
            aspect-ratio: 4/5;
            position: relative;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 15px;
        }

        .portfolio-card img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0.85;
            transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .portfolio-card:hover img {
            transform: scale(1.03);
            opacity: 1;
        }

        .card-info {
            position: relative;
            z-index: 2;
            background: rgba(5, 5, 5, 0.75);
            backdrop-filter: blur(4px);
            padding: 10px;
            border: 1px solid var(--border-color);
            font-size: 0.7rem;
        }

        /* --- FOOTER --- */
        footer {
            border-top: 1px solid var(--border-color);
            padding: 60px 20px 30px 20px;
        }

        .footer-cta {
            margin-bottom: 60px;
        }

        .footer-cta h2 {
            font-family: var(--font-sans);
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 800;
            margin-top: 10px;
        }

        .footer-info {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
            border-top: 1px solid var(--border-color);
            padding-top: 30px;
            font-size: 0.75rem;
            color: var(--text-secondary);
        }

        .footer-info a {
            color: var(--text-primary);
            text-decoration: none;
        }

        /* --- RESPONSIVE --- */
        @media (max-width: 768px) {
            header {
                grid-template-columns: 1fr 1fr;
            }
            nav {
                display: none;
            }
            .filter-bar {
                grid-template-columns: 1fr;
            }
            .filter-group {
                border-right: none;
                border-bottom: 1px solid var(--border-color);
            }
        }
    </style>
</head>
<body>

    <div class="grid-container">
        <!-- Guías estéticas de intersección (+) -->
        <span class="plus-mark" style="top: 10px; left: -6px;">+</span>
        <span class="plus-mark" style="top: 10px; right: -6px;">+</span>

        <!-- ENCABEZADO -->
        <header>
            <div class="logo">NON PLUS ULTRA</div>
            <nav>
                <ul>
                    <li><a href="#">INICIO</a></li>
                    <li><a href="#" style="text-decoration: underline;">PORTFOLIO</a></li>
                    <li><a href="#">BLOG</a></li>
                    <li><a href="#">CONTACTO</a></li>
                </ul>
            </nav>
            <div class="cta-container">
                <a href="#" class="cta-btn">AGENDAR VISITA →</a>
            </div>
        </header>

        <!-- SECCIÓN HERO -->
        <section class="hero">
            <span class="archive-tag">ARCHIVO DE PRODUCCIÓN / MMXXVI</span>
            <h1>PORTFOLIO</h1>
            <p class="hero-description">
                PIEZAS REALES PRODUCIDAS CON IA Y QA HUMANO — UGC, B-ROLL, PRODUCTO Y VISUALES DE MARCA. FILTRÁ POR TIPO DE ARCHIVO, PROYECTO O MATERIAL, Y ORDENÁ LAS PIEZAS.
            </p>
            <div class="hero-tags">
                <span>CALIDAD / QA HUMANO</span>
                <span>CONTINUIDAD VISUAL</span>
                <span>WHITE LABEL DISPONIBLE</span>
            </div>
        </section>

        <!-- BARRA DE FILTROS -->
        <section class="filter-bar">
            <div class="filter-group">
                <label>TIPO DE ARCHIVO</label>
                <select>
                    <option>TODO · 207</option>
                    <option>IMÁGENES · 169</option>
                    <option>VIDEOS · 38</option>
                </select>
            </div>
            <div class="filter-group">
                <label>PROYECTO</label>
                <select>
                    <option>TODOS LOS PROYECTOS · 207</option>
                    <option>BETA CHEVROLET</option>
                    <option>CHERY</option>
                    <option>CONCEPTUAL</option>
                    <option>MANU BERRAZ</option>
                    <option>UGC · KLINKIFY</option>
                </select>
            </div>
            <div class="filter-group">
                <label>MATERIAL</label>
                <select>
                    <option>TODO · 207</option>
                    <option>UGC · 33</option>
                    <option>PRODUCTO · 19</option>
                    <option>B-ROLL · 15</option>
                    <option>ARQUITECTURA · 125</option>
                    <option>CONCEPTUAL · 15</option>
                </select>
            </div>
            <div class="filter-group">
                <label>ORDENAR POR</label>
                <select>
                    <option>POR DEFECTO</option>
                    <option>Más reciente</option>
                    <option>Más viejo</option>
                </select>
            </div>
        </section>

        <!-- ESTADO Y CONTADOR -->
        <div class="results-meta">
            <span>207 RESULTADOS</span>
            <span>SIN FILTROS ACTIVOS</span>
        </div>

        <!-- MALLA/GALERÍA DE CONTENIDOS -->
        <main class="portfolio-grid">
            <!-- TARJETA 1 -->
            <article class="portfolio-card">
                <img src="assets/img/placeholders/plate-01.svg" alt="Pontesole TBH">
                <div class="card-info">
                    <strong>PONTESOLE TBH</strong><br>
                    RECORRIDO VIDEO · SEPTIEMBRE 2026
                </div>
            </article>

            <!-- TARJETA 2 -->
            <article class="portfolio-card">
                <img src="assets/img/placeholders/plate-02.svg" alt="Beta Onix RS">
                <div class="card-info">
                    <strong>BETA ONIX RS</strong><br>
                    CONCEPTUAL VIDEO · SEPTIEMBRE 2026
                </div>
            </article>

            <!-- TARJETA 3 -->
            <article class="portfolio-card">
                <img src="assets/img/placeholders/plate-03.svg" alt="Veredict Debate App">
                <div class="card-info">
                    <strong>VEREDICT DEBATE APP</strong><br>
                    UGC VIDEO · SEPTIEMBRE 2026
                </div>
            </article>

            <!-- TARJETA 4 -->
            <article class="portfolio-card">
                <img src="assets/img/placeholders/plate-04.svg" alt="Manu Berraz ARA">
                <div class="card-info">
                    <strong>MANU BERRAZ · ARA</strong><br>
                    ARQUITECTURA IMAGEN · JUNIO 2026
                </div>
            </article>
        </main>

        <!-- FOOTER -->
        <footer>
            <div class="footer-cta">
                <span class="archive-tag">¿TENÉS UNA IDEA?</span>
                <h2>LLEVÉMOSLA A PRODUCCIÓN.</h2>
                <br>
                <a href="#" class="cta-btn">IR A CONTACTO →</a>
            </div>

            <div class="footer-info">
                <div>
                    <p>NON PLUS ULTRA — PRODUCCIÓN DE CONTENIDO CON IA</p>
                    <p>BUENOS AIRES, ARGENTINA</p>
                </div>
                <div>
                    <p><a href="mailto:nonplusultracreative@gmail.com">NONPLUSULTRACREATIVE@GMAIL.COM</a></p>
                    <p>+54 11 2326 9868</p>
                </div>
                <div>
                    <p>© 2026 NON PLUS ULTRA</p>
                    <p>LUXUS EST POTESTAS</p>
                </div>
            </div>
        </footer>
    </div>

</body>
</html>