window.addEventListener('DOMContentLoaded', event => {

    // Activar Scrollspy de Bootstrap en el elemento nav principal
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Colapsar la barra de navegación responsiva cuando el toggler es visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

// Script para mostrar el modal con mensaje
document.addEventListener('DOMContentLoaded', function () {
    const modalEl = document.getElementById('modalMensajeVenta');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
});

// Script para esconder en el navegador #id
document.querySelectorAll('a[href^="#"]').forEach(link => {
link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);

    if (target) {
    e.preventDefault(); // Evita que aparezca #en la URL
    target.scrollIntoView({ behavior: 'smooth' }); // Scroll suave
    }
});
});

// Para mostrar la información de un jugador y los disponibles
function mostrarInfoJugador(jugador) {
    const infoJugador = document.getElementById("infoJugador");
    const infoVacio = document.getElementById("infoVacio");
    const seccionCambioJugador = document.getElementById("seccionCambioJugador");

    if (jugador.id) {
        infoJugador.classList.remove("d-none");
        infoVacio.classList.add("d-none");
        const jugadorName = jugador.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
        const spanPosicion = document.getElementById("jugadorPosicion");
        const spanEstado = document.getElementById("iconoLesion");

        // Reiniciamos las clases de los colores de posicion
        spanPosicion.classList.remove("pos-PO");
        spanPosicion.classList.remove("pos-DF");
        spanPosicion.classList.remove("pos-ME");
        spanPosicion.classList.remove("pos-DL");

        // Guardamos jugador en window para recuperarlo al abrir el modal de historico valor
        window.jugadorSeleccionado = jugador;

        document.getElementById("jugadorNombre").textContent = jugador.name;
        document.getElementById("jugadorFoto").src = jugador.photo;
        document.getElementById("jugadorClub").textContent = jugador.clubName;
        document.getElementById("clubEscudo").src = jugador.clubLogo;
        document.getElementById("jugadorPuntos").textContent = jugador.points;
        document.getElementById("jugadorPosicion").textContent = jugador.type;
        document.getElementById("jugadorPrecio").textContent = jugador.price.toLocaleString('es-ES');

        // Pintamos el fondo de la posicion del jugador
        spanPosicion.classList.add("pos-" + jugador.type);

        console.log(jugador.estado);

        switch (jugador.estado) {
            case "ACTIVE":
                jugador.estado = "SIN PROBLEMAS";
                spanEstado.innerHTML = "";
                break;

            case "INJURED":
                jugador.estado = "LESIONADO -";
                spanEstado.innerHTML = '<img src="/assets/iconoLesion.png" alt="Lesionado" width="25px" height="25px">';
                spanEstado.style.display = "inline-block";
                break;

            case "WEAKENED":
                jugador.estado = "TOCADO";
                spanEstado.innerHTML = '<i class="bi bi-question-circle-fill fs-4 text-warning"></i>';
                spanEstado.style.display = "inline-block";
                break;

            case "NOT SELECTED":
                jugador.estado = "NO CONVOCADO";
                break;

            case "MISCELLANEOUS":
                jugador.estado = "OTROS";
                spanEstado.innerHTML = '<img src="/assets/iconoOtros.png" alt="Duda" width="30" height="20">';
                spanEstado.style.display = "inline-block";
                break;

            case "YELLOW_RED_BANNED":
                jugador.estado = "SANCIONADO";
                spanEstado.innerHTML = '<i class="bi bi-file-fill fs-4 text-danger"></i>';
                spanEstado.style.display = "inline-block";
                break;

            default:
                jugador.estado = jugador.estado;
                break;
        }
        document.getElementById("jugadorEstado").textContent = jugador.estado;
        document.getElementById("jugadorInfoEstado").textContent = jugador.infoEstado;
        document.getElementById("jugadorPartidosJugados").textContent = jugador.partidosJugados;
        document.getElementById("jugadorGolesTotales").textContent = jugador.golesTotales;
        document.getElementById("jugadorGolesPenalti").textContent = jugador.golesPenalti;
        document.getElementById("jugadorMediaPuntos").textContent = jugador.mediaPuntos;
        document.getElementById("jugadorTarjetasAmarillas").textContent = jugador.tarjetasAmarillas;
        document.getElementById("jugadorTarjetasAmarRoja").textContent = jugador.tarjetasAmarRoja;
        document.getElementById("jugadorTarjetasRojas").textContent = jugador.tarjetasRojas;

        // Cramos tabla dinamica de historico de puntos
        // Llamamos a la funcion async await para conseguir el historial de puntos del jugador
        renderHistoricoPuntosModal(jugadorName, "jugadorHistoricoPuntos");

        
    } else {
        infoJugador.classList.add("d-none");
        infoVacio.classList.remove("d-none");
    }

    // Controlar visibilidad de la sección de cambio
    if (jugador.tactic !== "0") {
        seccionCambioJugador.classList.remove("d-none");
        // Filtrar sustitutos disponibles
        const disponibles = (window.plantilla || []).filter(p =>
            p.posicion === jugador.type && !p.linedup
        );

        const lista = document.getElementById("jugadoresDisponibles");
        lista.innerHTML = "";
        if (disponibles.length === 0) {
            lista.innerHTML = `<small class="text-muted">No hay sustitutos disponibles</small>`;
        } else {
            disponibles.forEach(p => {
                const item = document.createElement("button");
                item.className = "list-group-item list-group-item-action d-flex align-items-center";
                item.innerHTML = `
                    <img src="${p.hrefFoto}" class="rounded me-2" width="30" height="30">
                    <div class="flex-fill">
                        <strong>${p.name} </strong><img src="${p.hrefClubLogo}" class="rounded me-2" width="20" height="20">
                    </div>
                    <span class="badge bg-info">${p.puntosTotales}</span>
                `;
                item.onclick = () => cambiarJugador(jugador, p);
                lista.appendChild(item);
            });
        }
    } else {
        seccionCambioJugador.classList.add("d-none");
    }

    const modal = new bootstrap.Modal(document.getElementById("jugadorModal"));
    modal.show();

}

// Script para reabrir el modal del jugador al cerrar el modal del historial de valor
document.addEventListener("DOMContentLoaded", () => {
    const historialModalEl = document.getElementById('historialModal');
    const jugadorModalEl = document.getElementById('jugadorModal');

    // Evento cuando el modal historial se cierra
    historialModalEl.addEventListener('hidden.bs.modal', function () {
        // Reabrir el modal del jugador
        const jugadorModal = new bootstrap.Modal(jugadorModalEl);
        jugadorModal.show();
    });
});

// Script para capturar los datos del historial de valor del jugador desde el controlador en el modal historial de valor
document.addEventListener('DOMContentLoaded', function () {
    const historialModal = document.getElementById('historialModal');

    historialModal.addEventListener('show.bs.modal', function (event) {
        const jugador = window.jugadorSeleccionado;
        const jugadorId = jugador.id;
        const jugadorName = jugador.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
        document.getElementById('Nombre').textContent = jugador.name;

        fetch(`/model/cargarHistoricoValor/${jugadorName}`)
        .then(response => {
            if (!response.ok) {
            throw new Error("Error en la petición: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('historialLista');
            container.innerHTML = ''; // Limpiar

            // Parsear boxChart si viene como string
            const boxChart = typeof data.boxChart === "string" ? JSON.parse(data.boxChart) : data.boxChart;

            // Crear wrapper para scroll
            const scrollWrapper = document.createElement('div');
            scrollWrapper.style.maxHeight = '300px'; // ajusta según el alto deseado
            scrollWrapper.style.overflowY = 'auto';
            scrollWrapper.style.display = 'block';

            // Crear tabla
            const table = document.createElement('table');
            table.className = 'table table-striped table-dark'; // clases de Bootstrap opcionales

            // Encabezado
            const thead = document.createElement('thead');
            thead.innerHTML = `
                <tr>
                    <th>Fecha</th>
                    <th>Valor (€)</th>
                    <th>Diferencia (€)</th>
                </tr>`;
            table.appendChild(thead);

            const tbody = document.createElement('tbody');

            /** =========================
             * TABLA 1 - Últimos 10 valores
             * ========================= */
            const historial = boxChart.reverse();

            for (let i = 0; i < historial.length; i++) {
                const item = historial[i];
                const prevItem = i > 0 ? historial[i - 1] : null;
                const diff = prevItem ? prevItem.value - item.value : 0; // diferencia

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.date}</td>
                    <td>${item.value.toLocaleString()} €</td>
                    <td style="color:${diff >= 0 ? 'lightgreen' : 'red'}">
                        ${diff >= 0 ? '+' : ''}${diff.toLocaleString()} €
                    </td>
                `;
                tbody.appendChild(tr);
            }

            table.appendChild(tbody);
            container.appendChild(table);
            scrollWrapper.appendChild(table);
            container.appendChild(scrollWrapper);

        })
        .catch(err => console.error("Error en fetch:", err));

    });
});

async function cargarHistorialPuntos(jugadorName){
    
    const response = await fetch(`/model/cargarHistoricoPuntos/${jugadorName}`);
    if (!response.ok) throw new Error("Error en la petición: " + response.status);
    return await response.json(); // devuelve el objeto data
}

async function renderHistoricoPuntosModal(jugadorName, containerId = "jugadorHistoricoPuntos") {
    // Llamamos a la función que carga los datos
    jugadorName = jugadorName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const historicoPuntos = await cargarHistorialPuntos(jugadorName);

    const container = document.getElementById(containerId);
    if (!container) return; // si no existe el contenedor, salir

    container.innerHTML = ""; // limpiar contenido anterior

    const table = document.createElement("table");
    table.className = "table text-center mb-0";

    const rowPuntos = document.createElement("tr");
    const rowJornadas = document.createElement("tr");

    // Cremaos jornadas y consultamos si el jugador ha jugado en algun partido, si no creamos un array de 5 objetos para que aparezca
    let jornadas = [];

    if (!historicoPuntos.boxPoints.jornadas || historicoPuntos.boxPoints.jornadas.length === 0) {
        // Generar array de 5 objetos con puntos "-"
        jornadas = Array.from({ length: 5 }, (_, i) => ({
            week: `J${i + 1}`,
            points: "-"
        }));
    } else {
        // Tomamos las últimas 5 jornadas y damos la vuelta
        jornadas = [...historicoPuntos.boxPoints.jornadas].reverse().slice(-5).reverse();
    }

    jornadas.forEach(valor => {
        // Celda de puntos
        const tdPuntos = document.createElement("td");
        tdPuntos.textContent = valor.points;

        // Colorear según reglas
        if (valor.points < 0) {
            tdPuntos.classList.add("bg-rojo");
        } else if (valor.points == 0 || valor.points == "-") {
            tdPuntos.classList.add("bg-gris");
        } else if (valor.points >= 1 && valor.points <= 4) {
            tdPuntos.classList.add("bg-naranja");
        } else if (valor.points >= 5 && valor.points <= 9) {
            tdPuntos.classList.add("bg-verde");
        } else if (valor.points > 9) {
            tdPuntos.classList.add("bg-azul");
        }

        rowPuntos.appendChild(tdPuntos);

        // Celda de jornadas
        const tdJornada = document.createElement("td");
        tdJornada.textContent = `${valor.week}`;
        tdJornada.style.fontSize = "12px";
        tdJornada.style.color = "white";
        rowJornadas.appendChild(tdJornada);
    });

    table.appendChild(rowPuntos);
    table.appendChild(rowJornadas);

    container.appendChild(table);
}

// Ejecutar automáticamente para todos los contenedores con data-jugador
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-jugador]").forEach(div => {
        const jugadorName = div.dataset.jugador;
        const context = div.dataset.context;
        renderHistoricoPuntos(jugadorName, div.id, context);
    });
});

async function renderHistoricoPuntos(jugadorName, containerId = "jugadorHistoricoPuntos", context) {
    // Llamamos a la función que carga los datos
    jugadorName = jugadorName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const historicoPuntos = await cargarHistorialPuntos(jugadorName);

    const container = document.getElementById(containerId);
    if (!container) return; // si no existe el contenedor, salir

    container.innerHTML = ""; // limpiar contenido anterior

    const table = document.createElement("table");
    table.className = "table text-center mb-0";

    const rowPuntos = document.createElement("tr");

    // Cremaos jornadas y consultamos si el jugador ha jugado en algun partido, si no creamos un array de 5 objetos para que aparezca
    let jornadas = [];

    if (!historicoPuntos.boxPoints.jornadas || historicoPuntos.boxPoints.jornadas.length === 0) {
        // Generar array de 5 objetos con puntos "-"
        jornadas = Array.from({ length: 5 }, (_, i) => ({
            week: `J${i + 1}`,
            points: "-"
        }));
    } else {
        // Tomamos las últimas 5 jornadas y damos la vuelta
        jornadas = [...historicoPuntos.boxPoints.jornadas].reverse().slice(-5).reverse();
    }
    
    jornadas.forEach(valor => {
        // Celda de puntos
        const tdPuntos = document.createElement("td");
        tdPuntos.textContent = valor.points;

        // Colorear según reglas
        if (valor.points < 0) {
            tdPuntos.classList.add("bg-rojo");
        } else if (valor.points == 0 || valor.points == "-") {
            tdPuntos.classList.add("bg-gris");
        } else if (valor.points >= 1 && valor.points <= 4) {
            tdPuntos.classList.add("bg-naranja");
        } else if (valor.points >= 5 && valor.points <= 9) {
            tdPuntos.classList.add("bg-verde");
        } else if (valor.points > 9) {
            tdPuntos.classList.add("bg-azul");
        }

        rowPuntos.appendChild(tdPuntos);

    });

    table.appendChild(rowPuntos);

    container.appendChild(table);
}

