/* ==========================================================================
   NON PLUS ULTRA · CATÁLOGO DE PIEZAS
   --------------------------------------------------------------------------
   Fuente única de verdad. La UI NO tiene números escritos a mano: el contador
   de resultados se deriva de este archivo. Para sumar o quitar piezas, editá
   los pools y los grupos de abajo.

   MATRIZ DE CORTE (verificada, suma 207):
     · TIPO     → imagen 169 · video 38
     · MATERIAL → arquitectura 125 · ugc 33 · producto 19 · b-roll 15
                  · conceptual 15
   Nota: la guía original listaba "CONCEPTUAL · 18", lo que daba 210 en total.
   Se corrigió a 15 para que el archivo cierre en 207.
   ========================================================================== */
(function (global) {
    'use strict';

    var MESES = ['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
                 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'];

    /* --- 1. Taxonomías --- */
    var PROYECTOS = ['BETA CHEVROLET', 'CHERY', 'CONCEPTUAL', 'MANU BERRAZ', 'UGC · KLINKIFY'];
    var MATERIALES = ['UGC', 'PRODUCTO', 'B-ROLL', 'ARQUITECTURA', 'CONCEPTUAL'];

    /* --- 2. Pools de títulos --- */

    // MANU BERRAZ · arquitectura: 5 tipos × 25 lugares = 125 piezas
    var ARQ_TIPOS = ['CASA', 'EDIFICIO', 'LOFT', 'HOTEL', 'TALLER'];
    var ARQ_LUGARES = ['PALERMO', 'ROSEDO', 'CÓRDOBA', 'MENDOZA', 'ROSARIO',
        'LA PLATA', 'TUCUMÁN', 'SALTA', 'NEUQUÉN', 'BARILOCHE', 'MAR DEL PLATA',
        'SANTA FE', 'PARANÁ', 'CORRIENTES', 'POSADAS', 'RESISTENCIA', 'FORMOSA',
        'JUNÍN', 'VILLA ELISA', 'BELGRANO', 'PALPALÁ', 'QUILMES', 'NECOCHEA',
        'COMODORO RIVADAVIA', 'RÍO GALLEGOS'];

    var UGC_TITULOS = ['PONTESOLE TBH', 'VEREDICT DEBATE APP', 'KLINKIFY CREATORS · SET A',
        'SPOTIFY SESSION', 'ZURICH SEGUROS', 'ANHEUSER-BUSCH', 'OLIMPO GYM',
        'COFFEE LAB', 'MODA URBANA · REEL 01', 'MODA URBANA · REEL 02', 'MODA URBANA · REEL 03',
        'TECNO UNBOXING', 'RUN CLUB · EP.01', 'RUN CLUB · EP.02', 'SKATE SESSION',
        'RECETA 60 SEG', 'BARBERÍA · CORTES', 'YOGA FLOW', 'PODCAST BRANDING',
        'COLAB NETFLIX', 'EVENTO LANZAMIENTO', 'BELLEZA · RUTINA', 'FITNESS · CARDIO',
        'GAMING SETUP', 'VIAJES · ISLAND', 'AUTOMOTIVOS · DRIFT', 'MASCOTAS · UGC',
        'LIFESTYLE · MAÑANA', 'LIFESTYLE · NOCHE', 'HOMBRE DE NEGOCIO', 'MADRES DIGITALES',
        'FITNESS · PESAS', 'STREET STYLE · BSAS'];

    var BETA_BROLL = ['BETA ONIX RS', 'BETA ONIX PLUS', 'BETA CROZZ', 'BETA ONIX 2026',
        'BETA SPORT', 'BETA GT · NOCHE', 'BETA GT · ASFALTO', 'BETA RS · INTERIOR',
        'BETA RS · CARROCERÍA', 'BETA ONIX · CIUDAD', 'BETA CROZZ · PLAYA', 'BETA · CAR PAINT',
        'BETA · TUNING', 'BETA · LLUVIA', 'BETA · NEON DRIVE'];

    var BETA_CONCEPT = ['BETA · VISIÓN NOCTURNA', 'BETA · CROMADO LÍQUIDO', 'BETA · NEÓN URBANO'];

    var CHERY_TITULOS = ['CHERY TIGGO 4', 'CHERY TIGGO 5', 'CHERY TIGGO 7', 'CHERY TIGGO 8',
        'CHERY TIGGO 8 PRO', 'CHERY QQ', 'CHERY QQ ICE', 'CHERY ARRIZO 5',
        'CHERY ARRIZO 6', 'CHERY ARRIZO 8', 'CHERY EINSTIG', 'CHERY EXEED TXL',
        'CHERY EXEED VX', 'CHERY EXEED ET', 'CHERY KOVO', 'CHERY KARUNA',
        'CHERY · SALÓN INTERIOR', 'CHERY · TRUNK', 'CHERY · FRENTE'];

    var CONCEPT_TITULOS = ['MONOLITO', 'ESCARCHA', 'NEÓN LÍQUIDO', 'DUNA',
        'PLATA LÍQUIDA', 'VIDRIO FUNDIDO', 'CARBONO', 'OBSIDIANA',
        'FLUJO', 'INTERFERENCIA', 'CATALIZADOR', 'RESONANCIA'];

    /* --- 3. Grupos de producción ---------------------------------------
       proyecto · material · pool de títulos · cuántos REGULARES son video.
       Los títulos de DESTACADAS se sacan del reparto y usan su propio tipo,
       así el corte final (38 videos) no se descuadra al tocar los pools. */

    var GRUPOS = [
        // MANU BERRAZ domina el archivo: 125 de arquitectura (2 recorridos video)
        { proyecto: 'MANU BERRAZ', material: 'ARQUITECTURA', videos: 2, pool: null },
        { proyecto: 'UGC · KLINKIFY', material: 'UGC', videos: 18, pool: UGC_TITULOS },
        { proyecto: 'BETA CHEVROLET', material: 'B-ROLL', videos: 8, pool: BETA_BROLL },
        { proyecto: 'BETA CHEVROLET', material: 'CONCEPTUAL', videos: 3, pool: BETA_CONCEPT },
        { proyecto: 'CHERY', material: 'PRODUCTO', videos: 4, pool: CHERY_TITULOS },
        { proyecto: 'CONCEPTUAL', material: 'CONCEPTUAL', videos: 0, pool: CONCEPT_TITULOS }
    ];

    /* --- 4. Piezas destacadas: encabezan el orden por defecto -----------
       'tipo' y 'subtipo' reproducen literalmente las 4 tarjetas de la guía. */
    var DESTACADAS = {
        'PONTESOLE TBH': { tipo: 'video', subtipo: 'RECORRIDO', fecha: '2026-09-14' },
        'BETA ONIX RS': { tipo: 'video', subtipo: 'CONCEPTUAL', fecha: '2026-09-08' },
        'VEREDICT DEBATE APP': { tipo: 'video', subtipo: 'UGC', fecha: '2026-09-02' },
        'MANU BERRAZ · ARA': { tipo: 'imagen', subtipo: 'ARQUITECTURA', fecha: '2026-06-18' }
    };

    /* --- 5. Utilidades deterministas ------------------------------------
       Sin Math.random: el archivo debe ser idéntico en cada carga para que
       el orden por defecto sea estable. */
    function hash(str) {
        var h = 2166136261, i;
        for (i = 0; i < str.length; i++) {
            h ^= str.charCodeAt(i);
            h = Math.imul(h, 16777619);
        }
        return Math.abs(h);
    }

    // Devuelve [true|false] con `videos` true repartidos de forma pareja.
    function spreadVideo(total, videos) {
        var out = [], i;
        for (i = 0; i < total; i++) {
            out.push(Math.floor((i + 1) * videos / total) > Math.floor(i * videos / total));
        }
        return out;
    }

    function titulosArquitectura() {
        var out = [], t, l;
        for (t = 0; t < ARQ_TIPOS.length; t++) {
            for (l = 0; l < ARQ_LUGARES.length; l++) {
                out.push(ARQ_TIPOS[t] + ' · ' + ARQ_LUGARES[l]);
            }
        }
        out[0] = 'MANU BERRAZ · ARA'; // la destacada ocupa la primera celda
        return out; // 125 piezas: 1 destacada + 124 regulares
    }

    function crearPieza(titulo, grupo, tipo, n) {
        var seed = hash(titulo + grupo.material);
        var star = DESTACADAS[titulo];
        var fecha;

        if (star) {
            fecha = star.fecha;
        } else {
            // Reparto determinista: sep 2025 → ago 2026
            var dias = seed % 330;
            fecha = new Date(Date.UTC(2026, 7, 31) - dias * 86400000)
                .toISOString().slice(0, 10);
        }

        return {
            id: 'NPU-' + String(n).padStart(4, '0'),
            titulo: titulo,
            proyecto: grupo.proyecto,
            material: grupo.material,
            tipo: tipo,
            subtipo: (star && star.subtipo) || grupo.material,
            fecha: fecha,
            imagen: 'assets/img/placeholders/plate-0' + (seed % 6 + 1) + '.svg',
            duracion: tipo === 'video' ? '00:' + String(9 + seed % 51).padStart(2, '0') : null,
            resolucion: tipo === 'video' ? '1920×1080'
                : ['2048×2560', '3072×4096', '4096×5464'][seed % 3]
        };
    }

    /* --- 6. Construcción del archivo ----------------------------------- */
    function construir() {
        var piezas = [];
        var contador = 0;

        GRUPOS.forEach(function (grupo) {
            var todos = grupo.pool || titulosArquitectura();
            var regulares = [];
            var destacadas = [];

            todos.forEach(function (t) {
                (DESTACADAS[t] ? destacadas : regulares).push(t);
            });

            // Las destacadas conservan el tipo que fija la guía.
            destacadas.forEach(function (titulo) {
                piezas.push(crearPieza(titulo, grupo, DESTACADAS[titulo].tipo, ++contador));
            });

            // El resto se reparte los videos del grupo de forma pareja.
            var esVideo = spreadVideo(regulares.length, grupo.videos);
            regulares.forEach(function (titulo, i) {
                piezas.push(crearPieza(titulo, grupo, esVideo[i] ? 'video' : 'imagen', ++contador));
            });
        });

        // Orden por defecto: las 4 destacadas de la guía, en ese orden exacto.
        var orden = [];
        Object.keys(DESTACADAS).forEach(function (t) {
            piezas.forEach(function (p, i) {
                if (p.titulo === t) { orden.push(i); }
            });
        });
        piezas.forEach(function (p, i) { if (orden.indexOf(i) === -1) { orden.push(i); } });

        return {
            piezas: orden.map(function (i) { return piezas[i]; }),
            proyectos: PROYECTOS,
            materiales: MATERIALES,
            meses: MESES
        };
    }

    var archivo = construir();
    global.NPU_DATA = archivo;
}(this));

