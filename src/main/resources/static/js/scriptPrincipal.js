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

function renderAlineacion(jugadores, tactica) {
    const cancha = document.getElementById("cancha");

    // Mantener las líneas del campo
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
    if (!coords) return;

    const total = jugadores.length;

    jugadores.forEach(jugador => {
        // Invertir: 1 = delantero, 11 = portero
        const realPos = total - jugador.position + 1;

        const pos = coords[realPos - 1];
        if (!pos) return;

        const div = document.createElement("div");
        div.className = "jugador";
        div.style.left = pos.x + "%";
        div.style.top = pos.y + "px";
        div.innerHTML = `<img src="${jugador.photo}" title="${jugador.name}">`;
        div.onclick = () => mostrarInfoJugador(jugador);
        cancha.appendChild(div);
    });
}

function mostrarInfoJugador(jugador, event) {
    const popup = document.getElementById("popupJugador");

    // Rellenar datos
    document.getElementById("popupFoto").src = jugador.photo;
    document.getElementById("popupNombre").textContent = jugador.name;
    document.getElementById("popupClub").textContent = jugador.clubName;
    document.getElementById("popupPuntos").textContent = jugador.points;
    document.getElementById("popupLive").textContent = jugador.livePoints;

    // Posicionar al lado del jugador (arriba a la derecha)
    const rect = event.target.getBoundingClientRect();
    popup.style.top = (window.scrollY + rect.top - 10) + "px";   // un poco más arriba
    popup.style.left = (window.scrollX + rect.right + 10) + "px"; // a la derecha

    // Mostrar popup
    popup.classList.remove("d-none");
}

// Cerrar popup al hacer click fuera
document.addEventListener("click", function(e) {
    const popup = document.getElementById("popupJugador");
    if (!popup.contains(e.target) && !e.target.classList.contains("jugador")) {
        popup.classList.add("d-none");
    }
});

function cambiarFormacion(nueva) {
    renderAlineacion(window.jugadores, nueva);
}

// Inicializamos cuando cargue la página
document.addEventListener("DOMContentLoaded", () => {
    if (window.jugadores && window.jugadores.length > 0) {
        const tactica = document.getElementById("tactica").value;
        renderAlineacion(window.jugadores, tactica);
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
