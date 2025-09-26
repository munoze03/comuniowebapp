// Funciones de seccion Alineación
// Posiciones predefinidas para cada táctica
const posiciones = {
    "343": [
        {x: 50, y: 370},
        {x: 30, y: 270}, {x: 50, y: 270}, {x: 70, y: 270},
        {x: 20, y: 170}, {x: 40, y: 170}, {x: 60, y: 170}, {x: 80, y: 170},
        {x: 30, y: 70}, {x: 50, y: 70}, {x: 70, y: 70}
    ],
    "352": [
        {x: 50, y: 370},
        {x: 30, y: 270}, {x: 50, y: 270}, {x: 70, y: 270},
        {x: 20, y: 170}, {x: 35, y: 170}, {x: 50, y: 150}, {x: 65, y: 170}, {x: 80, y: 170},
        {x: 40, y: 70}, {x: 60, y: 70}
    ],
    "433": [
        {x: 50, y: 370},
        {x: 20, y: 270}, {x: 40, y: 270}, {x: 60, y: 270}, {x: 80, y: 270},
        {x: 30, y: 170}, {x: 50, y: 150}, {x: 70, y: 170},
        {x: 25, y: 70}, {x: 50, y: 60}, {x: 75, y: 70}
    ],
    "442": [
        {x: 50, y: 370},
        {x: 20, y: 270}, {x: 40, y: 270}, {x: 60, y: 270}, {x: 80, y: 270},
        {x: 20, y: 170}, {x: 40, y: 170}, {x: 60, y: 170}, {x: 80, y: 170},
        {x: 40, y: 70}, {x: 60, y: 70}
    ],
    "451": [
        {x: 50, y: 370},
        {x: 20, y: 270}, {x: 40, y: 270}, {x: 60, y: 270}, {x: 80, y: 270},
        {x: 20, y: 170}, {x: 35, y: 150}, {x: 50, y: 140}, {x: 65, y: 150}, {x: 80, y: 170},
        {x: 50, y: 70}
    ]
};

// Configuración por abreviaturas
const tiposPorTactica = {
    "343": ["PO", "DF", "DF", "DF", "ME", "ME", "ME", "ME", "DL", "DL", "DL"],
    "352": ["PO", "DF", "DF", "DF", "ME", "ME", "ME", "ME", "ME", "DL", "DL"],
    "433": ["PO", "DF", "DF", "DF", "DF", "ME", "ME", "ME", "DL", "DL", "DL"],
    "442": ["PO", "DF", "DF", "DF", "DF", "ME", "ME", "ME", "ME", "DL", "DL"],
    "451": ["PO", "DF", "DF", "DF", "DF", "ME", "ME", "ME", "ME", "ME", "DL"]
};


// Reconstruye la alineación actual para la nueva táctica
function reconstruirAlineacionSegunTactica(tactica) {
    const tipos = tiposPorTactica[tactica];
    const jugadoresPrevios = (window.jugadores || []).filter(j => j.id);

    // Agrupa alineados actuales por abreviatura
    const alineadosPorTipo = {
        PO: [],
        DF: [],
        ME: [],
        DL: []
    };
    jugadoresPrevios.forEach(j => {
        if (alineadosPorTipo[j.type]) alineadosPorTipo[j.type].push(j);
    });

    // Reinicia todos los 'linedup' de la plantilla
    if (window.plantilla) window.plantilla.forEach(p => p.linedup = false);

    // Genera nueva alineación
    const nuevaAlineacion = [];
    const contadores = { PO:0, DF:0, ME:0, DL:0 };
    tipos.forEach((tipo, idx) => {
        const jugador = alineadosPorTipo[tipo][contadores[tipo]] || null;
        contadores[tipo]++;
        if (jugador) {
            nuevaAlineacion.push({
                ...jugador,
                position: idx,
                tactic: tactica
            });
            // Marca como alineado en plantilla
            const p = window.plantilla.find(p => p.id === jugador.id);
            if (p) p.linedup = true;
        } else {
            nuevaAlineacion.push({
                position: idx,
                id: null,
                name: "",
                photo: "",
                clubName: "",
                clubLogo: "",
                points: "-",
                lastPoints: "-",
                livePoints: "-",
                type: tipo,
                tactic: tactica
            });
        }
    });

    window.jugadores = nuevaAlineacion;
}


// Cambia la táctica y actualiza la alineación
function cambiarFormacion(nueva) {
    reconstruirAlineacionSegunTactica(nueva);
    renderAlineacion(window.jugadores, nueva);
}

// Cambia un jugador en una posición concreta
function cambiarJugador(sale, entra) {
    // Quita el jugador "entra" de cualquier slot donde ya estuviera alineado
    window.jugadores.forEach((j, idx) => {
        if (j.id === entra.id) {
            window.jugadores[idx] = {
                ...j,
                id: null,
                name: "",
                photo: "",
                clubName: "",
                clubLogo: "",
                points: "-",
                livePoints: "-",
                lastPoints: "-",
            };
        }
    });

    // Marca el estado en plantilla
    if (window.plantilla) {
        window.plantilla.forEach(p => {
            if (p.id === entra.id) p.linedup = true;
            if (sale && sale.id && p.id === sale.id) p.linedup = false;
        });
    }

    // Reemplaza el slot correcto (por posición en el array)
    window.jugadores[sale.position] = convertirPlayerAlineacion(entra, sale.position, sale.tactic);

    // Renderiza y cierra modal
    const tactica = document.getElementById("tactica").value;
    renderAlineacion(window.jugadores, tactica);
    const modalEl = document.getElementById("jugadorModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
}

// Renderizado de la alineación
function renderAlineacion(jugadores, tactica) {
    const cancha = document.getElementById("cancha");
    if(!cancha) return;

    cancha.innerHTML = `
        <div class="linea-media"></div>
        <div class="centro-campo"></div>
        <div class="punto-centro"></div>
        <div class="area-grande area-grande-top"></div>
        <div class="area-pequena area-pequena-top"></div>
        <div class="area-grande area-grande-bottom"></div>
        <div class="area-pequena area-pequena-bottom"></div>
    `;

    const coords = posiciones[tactica];
    const tipos = tiposPorTactica[tactica];
    if (!coords || !tipos) return;

    jugadores.forEach((jugador, idx) => {
        const pos = coords[idx];
        if(!pos) return;

        const div = document.createElement("div");
        div.className = "jugador-container";
        div.style.left = pos.x + "%";
        div.style.top = pos.y + "px";

        if(jugador && jugador.id){
            div.innerHTML = `
                <img src="${jugador.photo}" class="foto-jugador" title="${jugador.name}">
                <div class="live-points" style="background-color: ${getBgColorLivePoints(jugador.livePoints)};">
                    ${jugador.livePoints}
                </div>
                <img src="${jugador.clubLogo}" class="club-logo" alt="${jugador.clubName}">
            `;
            div.onclick = () => mostrarInfoJugador(jugador);
        } else {
            div.style.backgroundColor = 'rgba(255,255,255,0.2)';
            div.style.border = '1px dashed rgba(255,255,255,0.4)';
            div.style.borderRadius = '50%';
            div.onclick = () => mostrarInfoJugador({
                id: null,
                name: "Vacío",
                clubName: "",
                photo: "",
                clubLogo: "",
                points: "-",
                livePoints: "-",
                lastPoints: "-",
                type: tipos[idx], // Abreviatura!
                position: idx,
                tactic: tactica
            });
        }

        cancha.appendChild(div);
    });

}

// (Resto de funciones: getBgColorLivePoints, ...)
function getBgColorLivePoints(puntos) {
    const p = parseFloat(puntos);
    if (isNaN(p)) return 'rgba(255,255,255,0.6)';
    if (p < 0) return '#dc3545';
    if (p <= 4) return '#fd7e14';
    return '#28a745';
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    // Normaliza la alineación inicial
    if (window.jugadores && window.jugadores.length > 0) {
        const tactica = document.getElementById("tactica").value;
        reconstruirAlineacionSegunTactica(tactica); // <-- ordena y rellena slots
        renderAlineacion(window.jugadores, tactica);
    }
});


// Funciones para el boton de Guardar Alineacion
document.addEventListener("DOMContentLoaded", () => {
    // ... tu inicialización normal ...

    const guardarBtn = document.getElementById("guardarAlineacionBtn");
    if (guardarBtn) {
      guardarBtn.addEventListener("click", function() {
        guardarAlineacion();
      });
    }
});

document.getElementById("formAlineacion").addEventListener("submit", function(e) {
    const tacticaSeleccionada = document.getElementById("tactica").value;
    document.getElementById("inputTacticHidden").value = tacticaSeleccionada;

    // Borrar inputs antiguos
    document.querySelectorAll("#formAlineacion input[name^='lineup']").forEach(el => el.remove());

    // Creamos inputs nuevos según el orden fijo de la táctica
    const orden = tiposPorTactica[tacticaSeleccionada];
    if (!orden) return; // por seguridad

    // Copia local de jugadores alineados
    const jugadores = [...(window.jugadores || [])];

    // Usamos un contador para no repetir jugadores
    const usados = new Set();

    orden.forEach((tipo, idx) => {
        // Busca el siguiente jugador disponible de ese tipo
        const jugador = jugadores.find(j => j.type === tipo && j.id && !usados.has(j.id));

        // Creamos el input hidden
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = `lineup[${idx+1}]`;
        input.value = jugador ? jugador.id : "";

        if (jugador) usados.add(jugador.id);

        document.getElementById("formAlineacion").appendChild(input);
    });
});

function convertirPlayerAlineacion(player, position, tactic) {
    return {
        position: position,
        id: player.id,
        name: player.name,
        photo: player.hrefFoto,
        clubName: player.clubName || player.club,
        clubLogo: player.hrefClubLogo,
        points: parseInt(player.puntosTotales),
        livePoints: player.livePoints,
        lastPoints: (player.ultimosPuntos === "" || player.ultimosPuntos == null) ? "-" : player.ultimosPuntos,
        type: player.posicion || player.type,
        tactic: tactic,
        tarjetasAmarillas: player.tarjetasAmarillas,
        tarjetasRojas: player.tarjetasRojas,
        tarjetasAmarRoja: player.tarjetasAmarRoja,
        estado: player.estado,
        infoEstado: player.infoEstado,
        partidosJugados: player.partidosJugados,
        golesTotales: player.golesTotales,
        golesPenalti: player.golesPenalti,
        price : player.valor,
        mediaPuntos: player.mediaPuntos
    };
}