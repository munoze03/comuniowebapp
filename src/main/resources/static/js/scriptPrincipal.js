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

// Configuración de formaciones (posiciones en el campo)
const formaciones = {
    "4-4-2": {
        defensores: [ {x:15,y:100}, {x:15,y:200}, {x:15,y:300}, {x:15,y:400} ],
        mediocampistas: [ {x:35,y:100}, {x:35,y:200}, {x:35,y:300}, {x:35,y:400} ],
        delanteros: [ {x:55,y:200}, {x:55,y:300} ],
        portero: {x:5,y:250}
    },
    "4-3-3": {
        defensores: [ {x:15,y:100}, {x:15,y:200}, {x:15,y:300}, {x:15,y:400} ],
        mediocampistas: [ {x:35,y:150}, {x:35,y:250}, {x:35,y:350} ],
        delanteros: [ {x:55,y:150}, {x:55,y:250}, {x:55,y:350} ],
        portero: {x:5,y:250}
    },
    "3-5-2": {
        defensores: [ {x:15,y:150}, {x:15,y:250}, {x:15,y:350} ],
        mediocampistas: [ {x:25,y:100}, {x:25,y:200}, {x:35,y:250}, {x:25,y:300}, {x:25,y:400} ],
        delanteros: [ {x:55,y:200}, {x:55,y:300} ],
        portero: {x:5,y:250}
    },
    "3-4-3": {
        defensores: [ {x:15,y:150}, {x:15,y:250}, {x:15,y:350} ],
        mediocampistas: [ {x:35,y:150}, {x:35,y:250}, {x:35,y:350}, {x:35,y:450} ],
        delanteros: [ {x:55,y:150}, {x:55,y:250}, {x:55,y:350} ],
        portero: {x:5,y:250}
    },
    "4-5-1": {
        defensores: [ {x:15,y:100}, {x:15,y:200}, {x:15,y:300}, {x:15,y:400} ],
        mediocampistas: [ {x:35,y:100}, {x:35,y:175}, {x:35,y:250}, {x:35,y:325}, {x:35,y:400} ],
        delanteros: [ {x:55,y:250} ],
        portero: {x:5,y:250}
    }
};

// Dibuja la alineación en el campo
function dibujarAlineacion(formacion, jugadores) {
    const cancha = document.getElementById("cancha");
    if (!cancha || !formaciones[formacion]) return;

    // Elimina jugadores anteriores
    cancha.querySelectorAll(".jugador").forEach(j => j.remove());

    const config = formaciones[formacion];
    let idx = 0;

    // Portero
    crearJugador(jugadores[idx++], config.portero, cancha);

    // Defensas
    config.defensores.forEach(pos => crearJugador(jugadores[idx++], pos, cancha));

    // Medios
    config.mediocampistas.forEach(pos => crearJugador(jugadores[idx++], pos, cancha));

    // Delanteros
    config.delanteros.forEach(pos => crearJugador(jugadores[idx++], pos, cancha));
}

// Crea y coloca un jugador en el campo
function crearJugador(jugador, pos, cancha) {
    if (!jugador) return;
    const div = document.createElement("div");
    div.className = "jugador";
    div.style.left = `${pos.x}%`;
    div.style.top = `${pos.y}px`;
    div.textContent = jugador.name.charAt(0); // Inicial del jugador
    div.onclick = () => mostrarInfoJugador(jugador);
    cancha.appendChild(div);
}

// Muestra la info de un jugador
function mostrarInfoJugador(jugador) {
    document.getElementById("jugador-info").innerHTML = `
        <h5 class="posicion-titulo">${jugador.name} 
            <span class="badge bg-secondary">${jugador.type}</span></h5>
        <p><img src="${jugador.photo}" alt="${jugador.name}" width="50" class="me-2 rounded-circle">
        <strong>${jugador.clubName}</strong> 
        <img src="${jugador.clubLogo}" alt="${jugador.clubName}" width="30"></p>
        <p><strong>Puntos:</strong> ${jugador.points} (${jugador.livePoints || 0} en vivo)</p>
        <p><strong>Posición en campo:</strong> ${jugador.position}</p>
    `;
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

