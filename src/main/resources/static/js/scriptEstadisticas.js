// // Funcion que controla los botones de mostrar mas o mostrar menos de la tabla de los jugadores
// document.addEventListener("DOMContentLoaded", function () {
//     const rows = document.querySelectorAll("#tbody tr");
//     const loadMoreBtn = document.getElementById("mostrarMasBtn");
//     const showLessBtn = document.getElementById("ocultarBtn");

//     let visible = 11;  // número de filas iniciales
//     const increment = 10; // cuántas filas mostrar cada vez

//     // Ocultar todas excepto las primeras "visible"
//     rows.forEach((row, index) => {
//         if (index >= visible) row.style.display = "none";
//     });

//     // Mostrar más
//     loadMoreBtn.addEventListener("click", () => {
//         let next = visible + increment;
//         for (let i = visible; i < next && i < rows.length; i++) {
//             rows[i].style.display = "";
//         }
//         visible += increment;

//         // Mostrar botón "Mostrar menos" después de la primera pulsación
//         showLessBtn.style.display = "inline-block";

//         // Si ya no quedan filas ocultas, esconder el botón "Mostrar más"
//         if (visible >= rows.length) {
//             loadMoreBtn.style.display = "none";
//         }
//     });

//     // Mostrar menos → volver al estado inicial
//     showLessBtn.addEventListener("click", () => {
//         visible = 11;
//         rows.forEach((row, index) => {
//             if (index >= visible) row.style.display = "none";
//             else row.style.display = "";
//         });
//         loadMoreBtn.style.display = "inline-block";
//         showLessBtn.style.display = "none";
//     });

//     // Si hay 11 o menos filas, ocultar el botón "Mostrar más"
//     if (rows.length <= visible) {
//         loadMoreBtn.style.display = "none";
//     }
// });

// // Funcion para filtrar en la tabla de jugadores
// document.addEventListener("DOMContentLoaded", () => {
//     const btnFiltros = document.getElementById("btnFiltros");
//     const panelFiltros = document.getElementById("panelFiltros");
//     const btnLimpiar = document.getElementById("btnLimpiarFiltros");

//     const tbody = document.getElementById("tbody");
//     const rows = tbody ? tbody.querySelectorAll("tr") : [];
//     const filtroEquipo = document.getElementById("filtroEquipo");
//     const filtroPosicion = document.getElementById("filtroPosicion");
//     const filtroValor = document.getElementById("filtroValor");

//     // util: texto seguro de una celda
//     function safeCellText(row, colIndex) {
//         const cell = row.cells && row.cells[colIndex];
//         return cell ? cell.innerText.trim() : "";
//     }

//     // util: obtener alt del img de una celda (equipo)
//     function safeImgAlt(row, colIndex) {
//         const cell = row.cells && row.cells[colIndex];
//         const img = cell && cell.querySelector && cell.querySelector("img");
//         return img && img.alt ? img.alt.trim() : "";
//     }

//     // parsea valores como "1.234.567", "1.2M", "1,2M", "1200K", "1200000" -> devuelve número (enteros) o NaN
//     function parseValor(text) {
//         if (!text) return NaN;
//         let s = String(text).trim().replace(/\s+/g, '').replace(/,/g, '.');
//         // 1.2M o 1.2m
//         const m = s.match(/^([\d.]+)m$/i);
//         if (m) return Math.round(parseFloat(m[1]) * 1000000);
//         // 1.2K o 1.2k
//         const k = s.match(/^([\d.]+)k$/i);
//         if (k) return Math.round(parseFloat(k[1]) * 1000);
//         // si hay dígitos sueltos (por ejemplo 1.234.567)
//         const digits = s.replace(/\D/g, '');
//         return digits ? parseInt(digits, 10) : NaN;
//     }

//     // Llena selects Equipo y Posición con valores únicos (seguros)
//     function llenarSelectSimple(select, colIndex, usarImgAlt = false) {
//         if (!select) return;
//         const valores = new Set();
//         rows.forEach(row => {
//             const v = usarImgAlt ? safeImgAlt(row, colIndex) : safeCellText(row, colIndex);
//             if (v) valores.add(v);
//         });
//         // limpiar select y añadir opción Todos
//         select.innerHTML = "";
//         const optAll = document.createElement("option");
//         optAll.value = "";
//         optAll.textContent = "Todos";
//         select.appendChild(optAll);

//         [...valores].sort().forEach(valor => {
//             const option = document.createElement("option");
//             option.value = valor;
//             option.textContent = valor;
//             select.appendChild(option);
//         });
//     }

//     // Llena filtroValor con opciones de rango (puedes ajustar rangos si quieres)
//     function llenarFiltroValorPorRangos(select) {
//         if (!select) return;
//         select.innerHTML = "";
//         const ranges = [
//             { value: "", label: "Todos" },
//             { value: "lt1000000", label: "< 1M" },
//             { value: "1000000-5000000", label: "1M - 5M" },
//             { value: "5000000-10000000", label: "5M - 10M" },
//             { value: "gt10000000", label: "> 10M" }
//         ];
//         ranges.forEach(r => {
//             const o = document.createElement("option");
//             o.value = r.value;
//             o.textContent = r.label;
//             select.appendChild(o);
//         });
//     }

//     try {
//         llenarSelectSimple(filtroEquipo, 1, true); // columna 1: imagen (usa alt)
//         llenarSelectSimple(filtroPosicion, 0, false);
//         llenarFiltroValorPorRangos(filtroValor, 5);
//     } catch (e) {
//         console.error("Error llenando selects de filtros:", e);
//     }

//     // Toggle panel filtros (defensivo)
//     if (btnFiltros && panelFiltros) {
//         btnFiltros.addEventListener("click", () => {
//             try {
//                 const computed = window.getComputedStyle(panelFiltros);
//                 panelFiltros.style.display = (computed.display === "none") ? "block" : "none";
//             } catch (e) {
//                 // si algo falla, alternar clase d-none si existe bootstrap
//                 panelFiltros.classList.toggle("d-none");
//             }
//         });
//     } else {
//         console.warn("btnFiltros o panelFiltros no encontrados en DOM.");
//     }

//     // Aplicar filtros
//     function aplicarFiltros() {
//         const equipo = filtroEquipo ? filtroEquipo.value : "";
//         const posicion = filtroPosicion ? filtroPosicion.value : "";
//         const valorRange = filtroValor ? filtroValor.value : "";

//         rows.forEach(row => {
//             let mostrar = true;

//             // equipo (alt del img)
//             if (equipo) {
//                 const equipoTexto = safeImgAlt(row, 1);
//                 if (equipoTexto !== equipo) mostrar = false;
//             }

//             // posicion
//             if (posicion) {
//                 const posText = safeCellText(row, 0);
//                 if (posText !== posicion) mostrar = false;
//             }

//             // valor por rangos
//             if (valorRange) {
//                 const valorCeldaText = safeCellText(row, 5);
//                 const vnum = parseValor(valorCeldaText);
//                 let match = false;
//                 switch (valorRange) {
//                     case "lt1000000": match = !isNaN(vnum) && vnum < 1000000; break;
//                     case "1000000-5000000": match = !isNaN(vnum) && vnum >= 1000000 && vnum <= 5000000; break;
//                     case "5000000-10000000": match = !isNaN(vnum) && vnum > 5000000 && vnum <= 10000000; break;
//                     case "gt10000000": match = !isNaN(vnum) && vnum > 10000000; break;
//                     default: match = !isNaN(vnum) && vnum.toString() === valorRange; // fallback exacto
//                 }
//                 if (!match) mostrar = false;
//             }

//             row.style.display = mostrar ? "" : "none";
//         });
//     }

//     // listeners (si existen)
//     if (filtroEquipo) filtroEquipo.addEventListener("change", aplicarFiltros);
//     if (filtroPosicion) filtroPosicion.addEventListener("change", aplicarFiltros);
//     if (filtroValor) filtroValor.addEventListener("change", aplicarFiltros);

//     if (btnLimpiar) {
//         btnLimpiar.addEventListener("click", () => {
//             if (filtroEquipo) filtroEquipo.value = "";
//             if (filtroPosicion) filtroPosicion.value = "";
//             if (filtroValor) filtroValor.value = "";
//             aplicarFiltros();
//         });
//     }
// });


// Leer datos desde el script JSON
const jugadoresScript = document.getElementById('jugadoresData');
const jugadores = JSON.parse(jugadoresScript.textContent);

// Ahora "jugadores" es un array de objetos JS
console.log(jugadores);

// Grid Options: Contains all of the Data Grid configurations
const gridOptions = {
    rowData: jugadores.map(jugador => ({
        ...jugador,
        puntos: parseInt(jugador.puntos),
        media: parseFloat(jugador.media),
        valor: parseFloat(jugador.valor.replace(/\./g, '')) // si viene como string
        })),
    columnDefs: [
        { field: "posicion",
            headerName: "",
            width: 45 
        },
        { field: "equipoLogo",
            headerName: "",
            cellRenderer: (params) => {
                const img = document.createElement("img");
                img.src = params.value;
                img.style.width = "22px";
                img.style.height = "22px";
                return img;
            },
            width: 45
        },
        { field: "nombre",
            headerName: "Nombre",
            flex: 1 
        },
        { field: "puntos",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "media",
            comparator: (a, b) => a - b,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "valor",
            comparator: (valueA, valueB) => valueA - valueB,
            valueFormatter: (params) => {
                if (params.value == null) return "";
                return new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
                }).format(params.value);
            },
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        {field: "racha",
            headerName: "Racha",
            width: 150,
            cellRenderer: (params) => {
                const valores = params.value; // asumimos un array de 5 números
                // Crear contenedor
                const container = document.createElement("div");
                container.style.display = "flex";
                container.style.gap = "2px"; // espacio entre celdas
                
                valores.forEach(val => {
                const cell = document.createElement("div");
                cell.style.width = "20px";
                cell.style.height = "20px";
                cell.style.display = "flex";
                cell.style.alignItems = "center";
                cell.style.justifyContent = "center";
                cell.style.color = "white";
                cell.style.fontSize = "12px";
                cell.style.borderRadius = "2px";
                
                // Fondo según valor
                if (val <= 0) cell.style.backgroundColor = "red";
                else if (val >= 1 && val <= 4) cell.style.backgroundColor = "orange";
                else if (val >= 5 && val <= 9) cell.style.backgroundColor = "green";
                else if (val >= 10) cell.style.backgroundColor = "blue";
                else if (val == "-") cell.style.backgroundColor = "Grey";
                
                cell.textContent = val;
                container.appendChild(cell);
                });
                
                return container;
            },
            sortable: false,
            filter: false
        }
    ]
};

// Your Javascript code to create the Data Grid
const myGridElement = document.querySelector('#tablaJugadores');
agGrid.createGrid(myGridElement, gridOptions);

