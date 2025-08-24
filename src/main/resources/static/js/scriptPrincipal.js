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
    console.log("Si llega aqui");
    const extras = document.querySelectorAll('.extra-noticia');
    const btn = document.getElementById('toggleNoticiasBtn');
    const isHidden = extras[0]?.classList.contains('d-none');

    extras.forEach(e => e.classList.toggle('d-none'));
    btn.textContent = isHidden ? 'Mostrar menos' : 'Mostrar más';
}

// Selector Clasificacion
document.addEventListener("DOMContentLoaded", function () {
    const btnTotal = document.getElementById("btnTotal");
    const btnJornada = document.getElementById("btnJornada");

    btnTotal.addEventListener("click", function () {
        btnTotal.classList.add("btn-success");
        btnTotal.classList.remove("btn-outline-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.add("d-none"));
    });

    btnJornada.addEventListener("click", function () {
        btnJornada.classList.add("btn-success");
        btnJornada.classList.remove("btn-outline-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.remove("d-none"));
    });
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
  console.log("Script cargado");
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

// JS de alineacion
// Posiciones predefinidas para cada táctica
const posiciones = {
    "343": [
        {x: 50, y: 370}, // Portero
        {x: 30, y: 270}, {x: 50, y: 270}, {x: 70, y: 270}, // 3 DEF
        {x: 20, y: 170}, {x: 40, y: 170}, {x: 60, y: 170}, {x: 80, y: 170}, // 4 MED
        {x: 30, y: 70}, {x: 50, y: 70}, {x: 70, y: 70}  // 3 DEL
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

const tiposPorTactica = {
    "343": ["portero", "defensa","defensa","defensa",
            "centrocampista","centrocampista","centrocampista","centrocampista",
            "delantero","delantero","delantero"],
    "352": ["portero", "defensa","defensa","defensa",
            "centrocampista","centrocampista","centrocampista","centrocampista","centrocampista",
            "delantero","delantero"],
    "433": ["portero", "defensa","defensa","defensa","defensa",
            "centrocampista","centrocampista","centrocampista",
            "delantero","delantero","delantero"],
    "442": ["portero", "defensa","defensa","defensa","defensa",
            "centrocampista","centrocampista","centrocampista","centrocampista",
            "delantero","delantero"],
    "451": ["portero", "defensa","defensa","defensa","defensa",
            "centrocampista","centrocampista","centrocampista","centrocampista","centrocampista",
            "delantero"]
};

// Mapeo abreviaturas a tipos completos
const tipoMap = {
    PO: "portero",
    DF: "defensa",
    ME: "centrocampista",
    DL: "delantero"
};

// Función de renderizado de alineación
function renderAlineacion(jugadores, tactica) {
    const cancha = document.getElementById("cancha");
    if(!cancha) return;

    // Líneas del campo
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

    const jugadoresPorTipo = {
        portero: jugadores.filter(j => tipoMap[j.type] === 'portero'),
        defensa: jugadores.filter(j => tipoMap[j.type] === 'defensa'),
        centrocampista: jugadores.filter(j => tipoMap[j.type] === 'centrocampista'),
        delantero: jugadores.filter(j => tipoMap[j.type] === 'delantero')
    };

    const contadores = { portero:0, defensa:0, centrocampista:0, delantero:0 };

    tipos.forEach((tipo, index) => {
        const pos = coords[index];
        if(!pos) return;

        const jugadoresTipo = jugadoresPorTipo[tipo];
        const jugador = jugadoresTipo[contadores[tipo]] || null;
        contadores[tipo]++;

        const div = document.createElement("div");
        div.className = "jugador";
        div.style.left = pos.x + "%";
        div.style.top = pos.y + "px";

        if(jugador){
            div.className = "jugador-container"; // ahora usamos este contenedor
            div.innerHTML = `
                <img src="${jugador.photo}" class="foto-jugador" title="${jugador.name}">
                <div class="live-points" style="background-color: ${getBgColorLivePoints(jugador.livePoints)};">
                    ${jugador.livePoints}
                </div>
                <img src="${jugador.clubLogo}" class="club-logo" alt="${jugador.clubName}">
            `;
            div.onclick = () => mostrarInfoJugador(jugador);
        } else {
            div.className = "jugador-container";
            div.style.backgroundColor = 'rgba(255,255,255,0.2)';
            div.style.border = '1px dashed rgba(255,255,255,0.4)';
            div.style.borderRadius = '50%';

            // click para seleccionar jugador libre en ese slot
            div.onclick = () => mostrarInfoJugador({
                id: null,
                name: "Vacío",
                clubName: "",
                photo: "",
                clubLogo: "",
                points: "-",
                livePoints: "-",
                type: tipo,        // este viene de tiposPorTactica[index]
                position: index,   // posición concreta en el campo
                tactic: tactica
            });
        }

        cancha.appendChild(div);
    });

    // Actualizamos la suma de puntos live global
    actualizarPuntosLive();
}

function mostrarInfoJugador(jugador) {
    const infoJugador = document.getElementById("infoJugador");
    const infoVacio = document.getElementById("infoVacio");

    if (jugador.id) {
        // Caso: jugador alineado
        infoJugador.classList.remove("d-none");
        infoVacio.classList.add("d-none");

        document.getElementById("jugadorFoto").src = jugador.photo;
        document.getElementById("jugadorNombre").textContent = jugador.name;
        document.getElementById("jugadorClub").textContent = jugador.clubName;
        document.getElementById("jugadorPosicion").textContent = jugador.type;
        document.getElementById("jugadorPuntos").textContent = jugador.points;
        document.getElementById("jugadorLive").textContent = jugador.livePoints;
    } else {
        // Caso: hueco vacío
        infoJugador.classList.add("d-none");
        infoVacio.classList.remove("d-none");

        // Mostrar tipo de posición en el título
        document.getElementById("jugadorModalLabel").textContent = 
            "Hueco en " + jugador.type.charAt(0).toUpperCase() + jugador.type.slice(1);
    }

    // Filtrar sustitutos disponibles
    const disponibles = (window.plantilla || []).filter(p =>
        tipoMap[p.posicion] === jugador.type &&
        !p.linedup
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
                    <strong>${p.name}</strong> <small class="text-muted">(${p.club})</small>
                </div>
                <span class="badge bg-info">${p.mediaPuntos}</span>
            `;
            item.onclick = () => cambiarJugador(jugador, p);
            lista.appendChild(item);
        });
    }

    // Mostrar modal
    const modal = new bootstrap.Modal(document.getElementById("jugadorModal"));
    modal.show();
}

function cambiarFormacion(nueva) {
    // Primero liberamos a todos los jugadores de plantilla
    if (window.plantilla) {
        window.plantilla.forEach(p => p.linedup = false);
    }

    // Y luego marcamos como linedup solo los que están realmente en la nueva alineación
    if (window.jugadores) {
        window.jugadores.forEach(j => {
            const jugadorPlantilla = (window.plantilla || []).find(p => p.id === j.id);
            if (jugadorPlantilla) {
                jugadorPlantilla.linedup = true;
            }
        });
    }

    renderAlineacion(window.jugadores, nueva);
}

// Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    if (window.jugadores && window.jugadores.length > 0) {
        const tactica = document.getElementById("tactica").value;
        renderAlineacion(window.jugadores, tactica);
    }
});

// Función para actualizar la suma de puntos live de Alineacion
// Actualizar puntos live global
function actualizarPuntosLive() {
    if (!window.jugadores || window.jugadores.length === 0) return;

    const totalLive = window.jugadores.reduce((sum, j) => {
        const puntos = parseFloat(j.livePoints);
        return sum + (isNaN(puntos) ? 0 : puntos);
    }, 0);

    const span = document.getElementById("livePoints");
    if(span) span.textContent = totalLive;
}

// Actualizamos los puntos live cada 30 segundos
setInterval(() => {
    // Aquí podrías recargar window.jugadores desde tu API si quieres puntos live reales
    actualizarPuntosLive();
}, 30000);

// Funcion para colorear puntos Live de alineacion 
function getBgColorLivePoints(puntos) {
    const p = parseFloat(puntos);
    if (isNaN(p)) return 'rgba(255,255,255,0.6)'; // neutro para "-"
    if (p < 0) return '#dc3545';      // rojo
    if (p <= 4) return '#fd7e14';     // naranja
    return '#28a745';                  // verde
}

function cambiarJugador(sale, entra) {
    // Marcar estados
    if (sale && sale.id) {
        const jugadorPlantillaSale = window.plantilla.find(p => p.id === sale.id);
        if (jugadorPlantillaSale) jugadorPlantillaSale.linedup = false;
    }
    entra.linedup = true;

    // Buscar posición en alineación
    if (sale && sale.id) {
        const index = window.jugadores.findIndex(j => j.id === sale.id);
        if (index !== -1) {
            window.jugadores[index] = convertirPlayerAlineacion(entra, sale.position, sale.tactic);
        }
    } else {
        // era un hueco vacío → añadimos en esa position
        window.jugadores.push(convertirPlayerAlineacion(entra, sale.position, sale.tactic));
    }

    // Re-render
    const tactica = document.getElementById("tactica").value;
    renderAlineacion(window.jugadores, tactica);

    // Cerrar modal
    const modalEl = document.getElementById("jugadorModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
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
        type: tipoMap[player.posicion],
        tactic: tactic
    };
}