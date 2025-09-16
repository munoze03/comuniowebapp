// Funcion que controla los botones de mostrar mas o mostrar menos de la tabla de los jugadores
document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll("#tbody tr");
    const loadMoreBtn = document.getElementById("mostrarMasBtn");
    const showLessBtn = document.getElementById("ocultarBtn");

    let visible = 11;  // número de filas iniciales
    const increment = 10; // cuántas filas mostrar cada vez

    // Ocultar todas excepto las primeras "visible"
    rows.forEach((row, index) => {
        if (index >= visible) row.style.display = "none";
    });

    // Mostrar más
    loadMoreBtn.addEventListener("click", () => {
        let next = visible + increment;
        for (let i = visible; i < next && i < rows.length; i++) {
            rows[i].style.display = "";
        }
        visible += increment;

        // Mostrar botón "Mostrar menos" después de la primera pulsación
        showLessBtn.style.display = "inline-block";

        // Si ya no quedan filas ocultas, esconder el botón "Mostrar más"
        if (visible >= rows.length) {
            loadMoreBtn.style.display = "none";
        }
    });

    // Mostrar menos → volver al estado inicial
    showLessBtn.addEventListener("click", () => {
        visible = 11;
        rows.forEach((row, index) => {
            if (index >= visible) row.style.display = "none";
            else row.style.display = "";
        });
        loadMoreBtn.style.display = "inline-block";
        showLessBtn.style.display = "none";
    });

    // Si hay 11 o menos filas, ocultar el botón "Mostrar más"
    if (rows.length <= visible) {
        loadMoreBtn.style.display = "none";
    }
});

// Funcion para filtrar en la tabla de jugadores
document.addEventListener("DOMContentLoaded", () => {
    const btnFiltros = document.getElementById("btnFiltros");
    const panelFiltros = document.getElementById("panelFiltros");
    const btnLimpiar = document.getElementById("btnLimpiarFiltros");

    const rows = document.querySelectorAll("#tbody tr");
    const filtroEquipo = document.getElementById("filtroEquipo");
    const filtroPosicion = document.getElementById("filtroPosicion");
    const filtroRacha = document.getElementById("filtroRacha");

    // Función para llenar los selects con valores únicos
    function llenarSelect(select, colIndex) {
        const valores = new Set();
        rows.forEach(row => valores.add(row.cells[colIndex].innerText.trim()));
        [...valores].sort().forEach(valor => {
            const option = document.createElement("option");
            option.value = valor;
            option.textContent = valor;
            select.appendChild(option);
        });
    }

    llenarSelect(filtroEquipo, 1);   // Equipo
    llenarSelect(filtroPosicion, 0); // Posición
    llenarSelect(filtroRacha, 6);    // Racha

    // Mostrar/ocultar panel
    btnFiltros.addEventListener("click", () => {
        panelFiltros.style.display = panelFiltros.style.display === "none" ? "block" : "none";
    });

    // Función de filtrado
    function aplicarFiltros() {
        const equipo = filtroEquipo.value;
        const posicion = filtroPosicion.value;
        const racha = filtroRacha.value;

        rows.forEach(row => {
            let mostrar = true;
            if (equipo && row.cells[1].innerText !== equipo) mostrar = false;
            if (posicion && row.cells[0].innerText !== posicion) mostrar = false;
            if (racha && row.cells[6].innerText !== racha) mostrar = false;
            row.style.display = mostrar ? "" : "none";
        });
    }

    filtroEquipo.addEventListener("change", aplicarFiltros);
    filtroPosicion.addEventListener("change", aplicarFiltros);
    filtroRacha.addEventListener("change", aplicarFiltros);

    btnLimpiar.addEventListener("click", () => {
        filtroEquipo.value = "";
        filtroPosicion.value = "";
        filtroRacha.value = "";
        aplicarFiltros();
    });
});
