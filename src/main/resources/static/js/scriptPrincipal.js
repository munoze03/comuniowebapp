window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
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

// Boton de Mostrar anteriores de seccion noticias
function toggleNoticias() {
    const extras = document.querySelectorAll('.extra-noticia');
    const btn = document.getElementById('toggleNoticiasBtn');
    const isHidden = extras[0]?.classList.contains('d-none');

    extras.forEach(e => e.classList.toggle('d-none'));
    btn.textContent = isHidden ? 'Mostrar menos' : 'Mostrar más';
}

// FUNCIONES DE CLASIFICACION
// Selector Clasificacion
document.addEventListener("DOMContentLoaded", function () {
    const btnTotal = document.getElementById("btnTotal");
    const btnJornada = document.getElementById("btnJornada");
    const btnLive = document.getElementById("btnLive");
    const btnMes = document.getElementById("btnMes");
    const tbody = document.querySelector("table.table tbody");

    btnTotal.addEventListener("click", function () {
        
        btnTotal.classList.add("btn-success");
        btnTotal.classList.remove("btn-outline-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-live").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");
        
        ordenarTabla("tipo-total");
    });

    btnJornada.addEventListener("click", function () {
        btnJornada.classList.add("btn-success");
        btnJornada.classList.remove("btn-outline-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");

        document.querySelectorAll(".tipo-live").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-total").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-mes").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");
        
        ordenarTabla("tipo-jornada");
    });

    btnLive.addEventListener("click", function (){
        btnLive.classList.add("btn-success");
        btnLive.classList.remove("btn-outline-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");
        

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-live").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-mes").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");

        ordenarTabla("tipo-live");
    })

    btnMes.addEventListener("click", function (){
        // Cambiar estilos de botones como ya haces
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnMes.classList.add("btn-success");
        btnMes.classList.remove("btn-outline-success");

        // 👉 Ocultar tabla completa
        document.getElementById("tablaClasificacion").classList.add("d-none");

        // 👉 Mostrar selector de mes
        document.getElementById("selectorMesContainer").classList.remove("d-none");
    });

    document.getElementById("selectorMes").addEventListener("change", async function () {
        const mesSeleccionado = this.value;
        console.log(mesSeleccionado);
        if (!mesSeleccionado) return;

        try {
            const response = await fetch(`/clasificacion/mes/${mesSeleccionado}`);
            if (!response.ok) throw new Error("Error al obtener la clasificación");
            
            const html = await response.text();
            document.querySelector("#tablaClasificacion #tbodyMes").innerHTML = html;

            // 👉 Ocultar el selector y reiniciarlo
            const selectorMes = document.getElementById("selectorMes");
            selectorMes.value = "";
            document.getElementById("selectorMesContainer").classList.add("d-none");

            // 👉 Mostrar la tabla
            document.getElementById("tablaClasificacion").classList.remove("d-none");

            // 👉 Mostrar tbodyMes y ocultar tbody normal
            document.getElementById("tbodyMes").classList.remove("d-none");
            document.getElementById("tbody").classList.add("d-none");

        } catch (err) {
            console.error(err);
            alert("No se pudo cargar la clasificación del mes seleccionado.");
        }
    });

    function ordenarTabla(tipo) {
        // tipo: "tipo-total" o "tipo-jornada"
        const rows = Array.from(tbody.querySelectorAll("tr"));
        rows.sort((a, b) => {
            const aVal = parseInt(a.querySelector(`.${tipo}`).textContent) || 0;
            const bVal = parseInt(b.querySelector(`.${tipo}`).textContent) || 0;
            return bVal - aVal; // descendente
        });
        // Vuelve a poner las filas en el orden correcto
        rows.forEach((row, idx) => {
            // Actualizar el número de posición visual si quieres:
            const posCell = row.querySelector("td:first-child span");
            if (posCell) posCell.textContent = idx + 1;
            tbody.appendChild(row);
        });
    }

    // Orden inicial por puntos totales:
    ordenarTabla("tipo-total");
});



// Botones de seleccion de ofertas
document.addEventListener('DOMContentLoaded', () => {
    const buttons = {
        realizadas: document.getElementById('btnOfertasRealizadas'),
        recibidas: document.getElementById('btnOfertasRecibidas'),
        pasadas: document.getElementById('btnOfertasPasadas')
    };

    const secciones = {
        realizadas: document.getElementById('ofertasRealizadas'),
        recibidas: document.getElementById('ofertasRecibidas'),
        pasadas: document.getElementById('ofertasPasadas')
    };

    function mostrar(tipoActivo) {
        // Mostrar/ocultar secciones
        Object.keys(secciones).forEach(tipo => {
            secciones[tipo].classList.toggle('d-none', tipo !== tipoActivo);
        });

        // Actualizar clases de botones
        Object.keys(buttons).forEach(tipo => {
            if (tipo === tipoActivo) {
                buttons[tipo].classList.remove('btn-outline-success');
                buttons[tipo].classList.add('btn-success');
            } else {
                buttons[tipo].classList.remove('btn-success');
                buttons[tipo].classList.add('btn-outline-success');
            }
        });
    }

    // Activación inicial
    mostrar('realizadas');

    // Eventos de los botones
    buttons.realizadas.addEventListener('click', () => mostrar('realizadas'));
    buttons.recibidas.addEventListener('click', () => mostrar('recibidas'));
    buttons.pasadas.addEventListener('click', () => mostrar('pasadas'));
});

// Botones de seleccion de Mercado
document.addEventListener('DOMContentLoaded', () => {
    const buttons = {
        ordenador: document.getElementById('btnMercadoOrdenador'),
        jugador: document.getElementById('btnMercadoJugador'),
    };

    const secciones = {
        ordenador: document.getElementById('MercadoOrdenador'),
        jugador: document.getElementById('MercadoJugador'),
    };

    function mostrar(tipoActivo) {
        // Mostrar/ocultar secciones
        Object.keys(secciones).forEach(tipo => {
            secciones[tipo].classList.toggle('d-none', tipo !== tipoActivo);
        });

        // Actualizar clases de botones
        Object.keys(buttons).forEach(tipo => {
            if (tipo === tipoActivo) {
                buttons[tipo].classList.remove('btn-outline-success');
                buttons[tipo].classList.add('btn-success');
            } else {
                buttons[tipo].classList.remove('btn-success');
                buttons[tipo].classList.add('btn-outline-success');
            }
        });
    }

    // Activación inicial
    mostrar('ordenador');

    // Eventos de los botones
    buttons.ordenador.addEventListener('click', () => mostrar('ordenador'));
    buttons.jugador.addEventListener('click', () => mostrar('jugador'));
});

// Controlador para poner directamente en el cuadro de texto de la plantilla el valor del jugador
document.addEventListener('DOMContentLoaded', () => {
    const formateados = document.querySelectorAll('.precio-formateado');

    formateados.forEach(input => {
        const realInput = input.closest('form').querySelector('.precio-real');
        const valorOriginal = input.dataset.valor;

        // Al enfocar, autocompletar si vacío
        input.addEventListener('focus', () => {
            if (!input.value) {
                const formateado = formatearMiles(valorOriginal);
                input.value = formateado;
                realInput.value = valorOriginal;
            }
        });

        // Al escribir, actualizar valor sin formato
        input.addEventListener('input', () => {
            const sinPuntos = input.value.replace(/\./g, '').replace(/\D/g, '');
            realInput.value = sinPuntos;
            input.value = formatearMiles(sinPuntos);
        });
    });

    function formatearMiles(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
});

// Muestra Mensaje al poner jugador en venta desde plantilla
document.addEventListener('DOMContentLoaded', function () {
    const modalEl = document.getElementById('modalMensajeVenta');
    if (modalEl) {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
});

// Boton de Mostrar anteriores de seccion Historial de mercado
let ofertasMostradas = 3; // Inicialmente mostramos 3
let mostrandoTodo = false; // Estado del botón

function toggleMercado() {
    const todas = document.querySelectorAll('.extra-oferta');
    const btn = document.getElementById('toggleMercadoBtn');

    if (!mostrandoTodo) {
        // Mostrar 3 más
        let hasta = ofertasMostradas + 3;
        for (let i = 0; i < hasta && i < todas.length; i++) {
            todas[i].classList.remove('d-none');
        }
        ofertasMostradas += 3;

        // Si hemos mostrado todas, cambiar texto del botón
        if (ofertasMostradas >= todas.length) {
            btn.textContent = 'Mostrar menos';
            mostrandoTodo = true;
        }
    } else {
        // Ocultar todo menos las 3 primeras
        todas.forEach((e, i) => {
            if (i >= 0) e.classList.add('d-none');
        });
        ofertasMostradas = 3;
        btn.textContent = 'Mostrar más';
        mostrandoTodo = false;
    }
}

// Activacion de input cuando cambiamos oferta en mercado.
function activarEdicion(id) {
    const texto = document.getElementById("oferta-texto-" + id);
    const input = document.getElementById("oferta-input-" + id);
    const modificarBtn = document.getElementById("modificar-btn-" + id);
    const guardarBtn = document.getElementById("guardar-btn-" + id);

    // Coger el valor actual de la oferta
    const valorActual = document.getElementById("oferta-valor-" + id).innerText.replace(/\./g, "");

    // Mostrar input con el valor actual
    input.value = valorActual;

    texto.classList.add("d-none");
    input.classList.remove("d-none");

    modificarBtn.classList.add("d-none");
    guardarBtn.classList.remove("d-none");

    input.focus();
}

function guardarOferta(id) {
    // copiar valor del input al hidden antes de enviar
    const input = document.getElementById("oferta-input-" + id);
    const hidden = document.getElementById("precio-real-" + id);

    hidden.value = input.value.replace(/\./g, ""); // limpio puntos de miles
}

// JS de inicio de sesion
document.addEventListener("DOMContentLoaded", () => {
  // Al cargar la página, rellena usuario si está guardado
  const savedUsername = localStorage.getItem("savedUsername");
  if (savedUsername) {
    const userInput = document.getElementById("user");
    if (userInput) {
      userInput.value = savedUsername;
    }
    const rememberCheckbox = document.getElementById("check");
    if (rememberCheckbox) {
      rememberCheckbox.checked = true;
    }
  }

  // Al enviar el formulario, guarda o elimina el usuario según checkbox
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      const username = document.getElementById("user").value;
      const remember = document.getElementById("check").checked;
      if (remember) {
        localStorage.setItem("savedUsername", username);
      } else {
        localStorage.removeItem("savedUsername");
      }
    });
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

// JS DE ALINEACION
// Posiciones predefinidas para cada táctica
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
                <div class="live-points" style="background-color: ${getBgColorLivePoints(jugador.lastPoints)};">
                    ${jugador.lastPoints}
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

    // Actualizamos la suma de puntos live global
    actualizarPuntosLive();
}

// Para mostrar la información de un jugador y los disponibles
function mostrarInfoJugador(jugador) {
    const infoJugador = document.getElementById("infoJugador");
    const infoVacio = document.getElementById("infoVacio");
    const seccionCambioJugador = document.getElementById("seccionCambioJugador");


    if (jugador.id) {
        infoJugador.classList.remove("d-none");
        infoVacio.classList.add("d-none");
        const jugadorName = jugador.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
        

        

        //document.getElementById("").textContent = jugador.position;
        //document.getElementById("jugadorId").textContent = jugador.id;
        // Guardamos jugador en window para recuperarlo al abrir el modal de historico valor
        window.jugadorSeleccionado = jugador;

        document.getElementById("jugadorNombre").textContent = jugador.name;
        document.getElementById("jugadorFoto").src = jugador.photo;
        document.getElementById("jugadorClub").textContent = jugador.clubName;
        //document.getElementById("").textContent = jugador.clubId;
        document.getElementById("clubEscudo").src = jugador.clubLogo;
        document.getElementById("jugadorPuntos").textContent = jugador.points;
        //document.getElementById("").textContent = jugador.livePoints;
        //document.getElementById("").textContent = jugador.lastPoint;
        document.getElementById("jugadorPosicion").textContent = jugador.type;
        //document.getElementById("jugadorTactic").textContent = jugador.tactic;
        document.getElementById("jugadorPrecio").textContent = jugador.price.toLocaleString('es-ES');
        switch (jugador.estado) {
            case "ACTIVE":
                jugador.estado = "SIN PROBLEMAS";
                break;

            case "INJURED":
                jugador.estado = "LESIONADO -";
                break;

            case "WEAKENED":
                jugador.estado = "TOCADO";
                break;

            case "NOT SELECTED":
                jugador.estado = "NO CONVOCADO";
                break;

            default:
                // Si quieres, aquí puedes dejar el estado tal cual
                // o poner un valor por defecto
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
        document.getElementById("jugadorModalLabel").textContent =
            "Hueco en " + (tipoLargo[jugador.type] || jugador.type);
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

function convertirPlayerAlineacion(player, position, tactic) {
    return {
        position: position,
        id: player.id,
        name: player.name,
        photo: player.hrefFoto,
        clubName: player.club,
        clubLogo: player.hrefClubLogo,
        points: parseInt(player.puntosTotales),
        livePoints: player.ultimosPuntos,
         lastPoints: (player.lastPoint === "" || player.lastPoint == null) ? "-" : player.lastPoint,
        type: player.posicion, // ¡Abreviatura!
        tactic: tactic
    };
}

// (Resto de funciones: getBgColorLivePoints, actualizarPuntosLive...)

function getBgColorLivePoints(puntos) {
    const p = parseFloat(puntos);
    if (isNaN(p)) return 'rgba(255,255,255,0.6)';
    if (p < 0) return '#dc3545';
    if (p <= 4) return '#fd7e14';
    return '#28a745';
}

function actualizarPuntosLive() {
    if (!window.jugadores || window.jugadores.length === 0) return;
    const totalLive = window.jugadores.reduce((sum, j) => {
        const puntos = parseFloat(j.livePoints);
        return sum + (isNaN(puntos) ? 0 : puntos);
    }, 0);
    const span = document.getElementById("livePoints");
    if(span) span.textContent = totalLive;
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

// Actualizar puntos live cada 30 segundos
setInterval(() => {
    actualizarPuntosLive();
}, 30000);

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

// FUNCIONES DE ADMINISTRACION
// Número inicial de transacciones visibles
let transaccionesMostradas = 5; 
const incremento = 5; // Cuántas transacciones mostrar al hacer clic en "Mostrar más"

function toggleTransacciones(boton) {
    const todas = document.querySelectorAll('.extra-transacciones');
    const btnMas = document.getElementById('mostrarMasBtn');
    const btnMenos = document.getElementById('mostrarMenosBtn');

    if (boton.id === 'mostrarMasBtn') {
        // Mostrar más
        for (let i = transaccionesMostradas; i < transaccionesMostradas + incremento && i < todas.length; i++) {
            todas[i].classList.remove('d-none');
        }
        transaccionesMostradas += incremento;

        // Si ya mostramos todas, ocultamos "Mostrar más"
        if (transaccionesMostradas >= todas.length) {
            btnMas.classList.add('d-none');
        }

        // "Mostrar menos" aparece siempre que mostramos más
        btnMenos.classList.remove('d-none');

    } else if (boton.id === 'mostrarMenosBtn') {
        // Mostrar menos: ocultar todas menos las 5 primeras
        todas.forEach((e, i) => {
            if (i >= 5) e.classList.add('d-none');
        });
        transaccionesMostradas = 5;

        // Restaurar botones
        btnMas.classList.remove('d-none');
        btnMenos.classList.add('d-none');
    }
}

// Inicializar: ocultar botón "Mostrar menos" al inicio
document.getElementById('mostrarMenosBtn').classList.add('d-none');

// Scripts para mostrar modalJugador en plantilla
document.querySelectorAll('.fotoPlantilla').forEach(img => {
    img.addEventListener('click', function() {
        const playerId = this.dataset.id;
        const player = window.plantilla.find(p => p.id == playerId);
        if (!player) return;
        // Aquí puedes llamar a tu función pasando userData
        mostrarInfoJugadorPlantilla(player);
    });
});
// Script para adaptar plantilla para modalJugador
function mostrarInfoJugadorPlantilla(player) {
    const jugador = {
                estado: player.estado,
                infoEstado: player.infoEstado,
                partidosJugados: player.partidosJugados,
                golesTotales: player.golesTotales,
                golesPenalti: player.golesPenalti,
                mediaPuntos: player.mediaPuntos,
                tarjetasAmarillas: player.tarjetasAmarillas,
                tarjetasAmarRoja: player.tarjetasAmarRoja,
                tarjetasRojas: player.tarjetasRojas,
                price: player.valor,
                id: player.id,
                name: player.name,
                clubName: player.club,
                photo: player.hrefFoto,
                clubLogo: player.hrefClubLogo,
                points: player.puntosTotales,
                livePoints: player.price,
                lastPoints: player.recommendedPrice,
                type: player.posicion,
                position: player.posicion,
                tactic: "0" 
            };
    mostrarInfoJugador(jugador) 
}

// Scripts para mostrar modalJugador en mercado
document.querySelectorAll('.fotoMercado').forEach(img => {
    img.addEventListener('click', function() {
        const playerId = this.dataset.id;
        const player = window.mercado.find(p => p.id == playerId);
        if (!player) return;
        // Aquí puedes llamar a tu función pasando userData
        mostrarInfoJugadorMercado(player);
    });
});
// Script para adaptar mercado para modalJugador
function mostrarInfoJugadorMercado(player) {
    const jugador = {
                estado: player.estado,
                infoEstado: player.infoEstado,
                partidosJugados: player.partidosJugados,
                golesTotales: player.golesTotales,
                golesPenalti: player.golesPenalti,
                mediaPuntos: player.mediaPuntos,
                tarjetasAmarillas: player.tarjetasAmarillas,
                tarjetasAmarRoja: player.tarjetasAmarRoja,
                tarjetasRojas: player.tarjetasRojas,
                price: player.price,
                id: player.id,
                name: player.namePlayer,
                clubName: player.club,
                photo: player.urlPhoto,
                clubLogo: player.urlPhotoClub,
                points: player.puntos,
                livePoints: player.price,
                lastPoints: player.recommendedPrice,
                type: player.position,
                position: player.position,
                tactic: "0" 
            };
    mostrarInfoJugador(jugador) 
}

// Scripts para mostrar modalJugador en ofertas
document.querySelectorAll('.fotoOfertas').forEach(img => {
    img.addEventListener('click', function() {
        const playerId = this.dataset.id;
        const player = window.ofertas.find(p => p.id == playerId);
        if (!player) return;
        // Aquí puedes llamar a tu función pasando userData
        mostrarInfoJugadorOfertas(player);
    });
});
// Script para adaptar ofertas para modalJugador
function mostrarInfoJugadorOfertas(player) {
    const jugador = {
                estado: player.estadoJugador,
                infoEstado: player.infoEstado,
                partidosJugados: player.partidosJugados,
                golesTotales: player.golesTotales,
                golesPenalti: player.golesPenalti,
                mediaPuntos: player.mediaPuntos,
                tarjetasAmarillas: player.tarjetasAmarillas,
                tarjetasAmarRoja: player.tarjetasAmarRoja,
                tarjetasRojas: player.tarjetasRojas,
                price: player.valor,
                id: player.id,
                name: player.name,
                clubName: player.clubName,
                photo: player.fotoJugador,
                clubLogo: player.logoClub,
                points: player.points,
                livePoints: player.valor,
                lastPoints: player.valor,
                type: player.position,
                position: player.position,
                tactic: "0" 
            };
    mostrarInfoJugador(jugador) 
}

// Scripts para mostrar modalJugador en historialOfertas
document.querySelectorAll('.fotoHistorialOfertas').forEach(img => {
    img.addEventListener('click', function() {
        const playerId = this.dataset.id;
        const player = window.historialOfertas.find(p => p.id == playerId);
        if (!player) return;
        // Aquí puedes llamar a tu función pasando userData
        mostrarInfoJugadorOfertas(player);
    });
});

// Script para volver a abrir el modal del jugador al cerrar el de historial de valor
document.addEventListener("DOMContentLoaded", function () {
  var historialModal = document.getElementById("historialModal");
  var jugadorModal = new bootstrap.Modal(document.getElementById("jugadorModal"));

  historialModal.addEventListener("hidden.bs.modal", function () {
    jugadorModal.show();
  });
});

//Script que controla el boton de historial de valor del modal del jugador
document.addEventListener("DOMContentLoaded", function () {
  var jugadorModalEl = document.getElementById("jugadorModal");
  var historialModalEl = document.getElementById("historialModal");

  var jugadorModal = new bootstrap.Modal(jugadorModalEl);
  var historialModal = new bootstrap.Modal(historialModalEl);

  // Cada vez que se abra historial, se oculta jugador
  historialModalEl.addEventListener("show.bs.modal", function () {
    jugadorModal.hide();
  });

  // Cada vez que se cierre historial, se vuelve a mostrar jugador
  historialModalEl.addEventListener("hidden.bs.modal", function () {
    jugadorModal.show();
  });

  // Delegación de eventos para cualquier botón dentro del modal de jugador
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("btnVerHistorial")) {
      historialModal.show();
    }
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
                const diff = prevItem ? item.value - prevItem.value : 0; // diferencia

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

    // Tomamos las últimas 5 jornadas y damos la vuelta
    const jornadas = [...historicoPuntos.boxPoints.jornadas].slice(-5).reverse();

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
        renderHistoricoPuntos(jugadorName, div.id);
    });
});

async function renderHistoricoPuntos(jugadorName, containerId = "jugadorHistoricoPuntos") {
    // Llamamos a la función que carga los datos
    jugadorName = jugadorName.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
    const historicoPuntos = await cargarHistorialPuntos(jugadorName);

    const container = document.getElementById(containerId);
    if (!container) return; // si no existe el contenedor, salir

    container.innerHTML = ""; // limpiar contenido anterior

    const table = document.createElement("table");
    table.className = "table text-center mb-0";

    const rowPuntos = document.createElement("tr");

    // Tomamos las últimas 5 jornadas y damos la vuelta
    const jornadas = [...historicoPuntos.boxPoints.jornadas].slice(-5).reverse();

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
