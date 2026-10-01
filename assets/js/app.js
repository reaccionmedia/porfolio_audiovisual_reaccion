/* ==========================================================================
   NON PLUS ULTRA · MOTOR DE ARCHIVO
   Pagina el archivo y abre el detalle sobre NPU_DATA (assets/js/data.js).
   Sin dependencias. ES5 para no depender de build.
   ========================================================================== */
(function () {
    'use strict';

    var DATA = window.NPU_DATA;
    if (!DATA) { return; }

    /* --- Estado --- */
    var PAGINA = 24;
    var visibles = 0;
    var ultimoFoco = null;

    /* --- Referencias del DOM --- */
    var $ = function (sel) { return document.querySelector(sel); };
    var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

    var grid = $('#archivo');
    var contador = $('#contador');
    var btnMas = $('#btn-mas');
    var lb = $('#lightbox');
    var lbVideo = $('#lb-video');
    var lbImg = $('#lb-img');

    var VIDEO_URLS = {
        'Showreel 2026 | Reaction Media Lab': 'https://youtu.be/CB4SFLBrDUw',
        'Reel de Infraestructura y Arquitectura': 'https://youtu.be/J6eOW4TUxVg',
        'Cobertura de Eventos Corporativos': 'https://youtu.be/DVUSOTZAABU',
        'Producción Audiovisual de Producto': 'https://youtu.be/vxAxVVpjwCI',
        'Aftermovie Festivales y Grandes Eventos': 'https://youtu.be/Io63XQCvPis',
        'Producción Audiovisual con Drones': 'https://youtu.be/-swjmXlcMho',
        'Aftermovie Evento de UNAJE': 'https://youtu.be/41bCubCk_Yw',
        'Portfolio para Comunicación Política': 'https://youtu.be/H2CtpTLCDDI',
        'Recopilado Municipio de Barranqueras': 'https://youtu.be/dIUwWbG2Cxk',
        'Barranqueras #Mega #Obras': 'https://youtu.be/6jpRd7aNlFM',
        'Motion Graphics y Animación': 'https://youtu.be/mj5M6BrmQjs',
        'Portfolio General 2023': 'https://youtu.be/4IGXsODu-Go'
    };

    function youtubeEmbedUrl(url) {
        if (!url) { return ''; }
        var match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/);
        if (match) { return 'https://www.youtube.com/embed/' + match[1] + '?autoplay=1&rel=0'; }
        return url;
    }

    /* --- Formateo de fecha: "SEPTIEMBRE 2026" --- */
    function fechaLarga(iso) {
        var p = iso.split('-');
        return DATA.meses[parseInt(p[1], 10) - 1] + ' ' + p[0];
    }

    function linea(pieza) {
        return pieza.subtipo + ' ' + (pieza.tipo === 'video' ? 'video' : 'imagen') +
            ' · ' + fechaLarga(pieza.fecha);
    }

    /* --- Renderizado de una tarjeta --- */
    function tarjeta(pieza, i) {
        var el = document.createElement('article');
        el.className = 'portfolio-card';
        el.setAttribute('data-index', i);
        el.setAttribute('tabindex', '0');
        el.setAttribute('role', 'button');
        el.setAttribute('aria-label',
            'Ver detalle de ' + pieza.titulo + ', ' + linea(pieza));

        var img = document.createElement('img');
        img.className = 'portfolio-card__img';
        img.src = pieza.imagen;
        img.alt = pieza.titulo;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 800;
        img.height = 1000;

        var badge = document.createElement('span');
        badge.className = 'card-badge' + (pieza.tipo === 'video' ? ' card-badge--video' : '');
        var punto = document.createElement('span');
        punto.className = 'card-badge__dot';
        badge.appendChild(punto);
        badge.appendChild(document.createTextNode(
            pieza.tipo === 'video' ? 'VIDEO' : 'IMAGEN'));

        var idx = document.createElement('span');
        idx.className = 'card-index';
        idx.textContent = String(i + 1).padStart(3, '0');

        var info = document.createElement('div');
        info.className = 'card-info';
        var fuerte = document.createElement('strong');
        fuerte.textContent = pieza.titulo;
        info.appendChild(fuerte);
        info.appendChild(document.createTextNode(linea(pieza)));

        el.appendChild(img);
        el.appendChild(badge);
        el.appendChild(idx);
        el.appendChild(info);
        return el;
    }


    /* --- Pintado de la galería --- */
    function pintar() {
        var total = DATA.piezas.length;
        var n = Math.min(PAGINA, total);
        var frag = document.createDocumentFragment();

        for (var i = 0; i < n; i++) {
            frag.appendChild(tarjeta(DATA.piezas[i], i));
        }

        grid.innerHTML = '';
        grid.appendChild(frag);
        visibles = n;

        contador.textContent = total + (total === 1 ? ' RESULTADO' : ' RESULTADOS');
        btnMas.hidden = visibles >= total;
    }

    function cargarMas() {
        var total = DATA.piezas.length;
        var frag = document.createDocumentFragment();
        var tope = Math.min(visibles + PAGINA, total);

        for (var i = visibles; i < tope; i++) {
            frag.appendChild(tarjeta(DATA.piezas[i], i));
        }

        grid.appendChild(frag);
        visibles = tope;
        btnMas.hidden = visibles >= total;
    }

    /* --- Lightbox --- */
    var lbTitulo = $('#lb-titulo');
    var lbLinea = $('#lb-linea');
    var lbRef = $('#lb-ref');
    var lbSpecs = $('#lb-specs');

    function filaSpec(etiqueta, valor) {
        var div = document.createElement('div');
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        dt.textContent = etiqueta;
        dd.textContent = valor;
        div.appendChild(dt);
        div.appendChild(dd);
        return div;
    }

    function abrirDetalle(indice) {
        var pieza = DATA.piezas[indice];
        if (!pieza) { return; }

        ultimoFoco = document.activeElement;
        var videoUrl = VIDEO_URLS[pieza.titulo] || '';

        if (videoUrl) {
            lbImg.hidden = true;
            lbImg.removeAttribute('src');
            lbVideo.hidden = false;
            lbVideo.src = youtubeEmbedUrl(videoUrl);
        } else {
            lbVideo.hidden = true;
            lbVideo.removeAttribute('src');
            lbImg.hidden = false;
            lbImg.src = pieza.imagen;
            lbImg.alt = pieza.titulo;
        }

        lbTitulo.textContent = pieza.titulo;
        lbLinea.textContent = linea(pieza);
        lbRef.textContent = 'REF. ' + pieza.id;

        lbSpecs.innerHTML = '';
        lbSpecs.appendChild(filaSpec('PROYECTO', pieza.proyecto));
        lbSpecs.appendChild(filaSpec('MATERIAL', pieza.material));
        lbSpecs.appendChild(filaSpec('TIPO', pieza.tipo === 'video' ? 'VIDEO' : 'IMAGEN'));
        if (pieza.duracion) { lbSpecs.appendChild(filaSpec('DURACIÓN', pieza.duracion)); }
        lbSpecs.appendChild(filaSpec('RESOLUCIÓN', pieza.resolucion));
        lbSpecs.appendChild(filaSpec('FECHA', fechaLarga(pieza.fecha)));
        lbSpecs.appendChild(filaSpec('QA', 'APROBADO'));

        lb.hidden = false;
        document.body.classList.add('lb-abierto');
        var cerrar = lb.querySelector('.lightbox__close');
        if (cerrar) { cerrar.focus(); }
    }

    function cerrarDetalle() {
        lb.hidden = true;
        // removeAttribute y no src='': un src vacío hace que el navegador
        // vuelva a pedir la página actual como si fuera una imagen.
        lbImg.hidden = true;
        lbImg.removeAttribute('src');
        lbVideo.hidden = true;
        lbVideo.removeAttribute('src');
        document.body.classList.remove('lb-abierto');
        if (ultimoFoco && ultimoFoco.focus) { ultimoFoco.focus(); }
    }

    /* --- Eventos --- */
    if (btnMas) { btnMas.addEventListener('click', cargarMas); }

    // Apertura de detalle: click y teclado (Enter / Espacio)
    if (grid) {
        grid.addEventListener('click', function (ev) {
            var card = ev.target.closest('.portfolio-card');
            if (card) { abrirDetalle(parseInt(card.getAttribute('data-index'), 10)); }
        });

        grid.addEventListener('keydown', function (ev) {
            if (ev.key !== 'Enter' && ev.key !== ' ' && ev.key !== 'Spacebar') { return; }
            var card = ev.target.closest('.portfolio-card');
            if (card) {
                ev.preventDefault();
                abrirDetalle(parseInt(card.getAttribute('data-index'), 10));
            }
        });
    }

    // Cierre del lightbox: botón, backdrop y tecla Escape
    $$('[data-lb-cerrar]').forEach(function (b) {
        b.addEventListener('click', cerrarDetalle);
    });

    document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') {
            if (!lb.hidden) { cerrarDetalle(); return; }
        }
    });

    /* --- Init --- */
    var anio = $('#anio');
    if (anio) { anio.textContent = String(new Date().getFullYear()); }

    if (grid) { pintar(); }
}());
