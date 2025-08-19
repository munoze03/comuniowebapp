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

// Configuraciones de posición para cada formación
const formaciones = {
    '4-4-2': {
        defensores: [
            { x: 15, y: 100 },
            { x: 15, y: 200 },
            { x: 15, y: 300 },
            { x: 15, y: 400 }
        ],
        mediocampistas: [
            { x: 35, y: 100 },
            { x: 35, y: 200 },
            { x: 35, y: 300 },
            { x: 35, y: 400 }
        ],
        delanteros: [
            { x: 55, y: 200 },
            { x: 55, y: 300 }
        ],
        portero: { x: 5, y: 250 }
    },
    '4-3-3': {
        defensores: [
            { x: 15, y: 100 },
            { x: 15, y: 200 },
            { x: 15, y: 300 },
            { x: 15, y: 400 }
        ],
        mediocampistas: [
            { x: 35, y: 150 },
            { x: 35, y: 250 },
            { x: 35, y: 350 }
        ],
        delanteros: [
            { x: 55, y: 150 },
            { x: 55, y: 250 },
            { x: 55, y: 350 }
        ],
        portero: { x: 5, y: 250 }
    },
    '3-5-2': {
        defensores: [
            { x: 15, y: 150 },
            { x: 15, y: 250 },
            { x: 15, y: 350 }
        ],
        mediocampistas: [
            { x: 25, y: 100 },
            { x: 25, y: 200 },
            { x: 35, y: 250 },
            { x: 25, y: 300 },
            { x: 25, y: 400 }
        ],
        delanteros: [
            { x: 55, y: 200 },
            { x: 55, y: 300 }
        ],
        portero: { x: 5, y: 250 }
    },
    '4-2-3-1': {
        defensores: [
            { x: 15, y: 100 },
            { x: 15, y: 200 },
            { x: 15, y: 300 },
            { x: 15, y: 400 }
        ],
        mediocampistas: [
            { x: 25, y: 150 },
            { x: 25, y: 350 },
            { x: 35, y: 100 },
            { x: 35, y: 250 },
            { x: 35, y: 400 }
        ],
        delanteros: [
            { x: 55, y: 250 }
        ],
        portero: { x: 5, y: 250 }
    },
    '5-3-2': {
        defensores: [
            { x: 10, y: 100 },
            { x: 10, y: 175 },
            { x: 10, y: 250 },
            { x: 10, y: 325 },
            { x: 10, y: 400 }
        ],
        mediocampistas: [
            { x: 30, y: 175 },
            { x: 30, y: 250 },
            { x: 30, y: 325 }
        ],
        delanteros: [
            { x: 50, y: 200 },
            { x: 50, y: 300 }
        ],
        portero: { x: 5, y: 250 }
    }
};

function dibujarAlineacion(formacion) {
    const cancha = document.getElementById('cancha');
    // Limpiamos solo los jugadores, no los elementos del campo
    const jugadores = document.querySelectorAll('.jugador');
    jugadores.forEach(jugador => jugador.remove());
    
    const config = formaciones[formacion];
    
    // Dibujar porteros
    const portero = document.createElement('div');
    portero.className = 'jugador';
    portero.style.left = `${config.portero.x}%`;
    portero.style.top = `${config.portero.y}px`;
    portero.textContent = '1';
    portero.onclick = () => mostrarInfoJugador('Portero', 'Guarda la portería', 'POR');
    cancha.appendChild(portero);
    
    // Dibujar defensas
    config.defensores.forEach((pos, i) => {
        const defensor = document.createElement('div');
        defensor.className = 'jugador';
        defensor.style.left = `${pos.x}%`;
        defensor.style.top = `${pos.y}px`;
        defensor.textContent = (i + 2).toString();
        defensor.onclick = () => mostrarInfoJugador(`Defensor ${i + 1}`, 'Protege la defensa', 'DEF');
        cancha.appendChild(defensor);
    });
    
    // Dibujar mediocampistas
    config.mediocampistas.forEach((pos, i) => {
        const medio = document.createElement('div');
        medio.className = 'jugador';
        medio.style.left = `${pos.x}%`;
        medio.style.top = `${pos.y}px`;
        medio.textContent = (i + 2 + config.defensores.length).toString();
        medio.onclick = () => mostrarInfoJugador(`Mediocampista ${i + 1}`, 'Controla el centro del campo', 'MED');
        cancha.appendChild(medio);
    });
    
    // Dibujar delanteros
    config.delanteros.forEach((pos, i) => {
        const delantero = document.createElement('div');
        delantero.className = 'jugador';
        delantero.style.left = `${pos.x}%`;
        delantero.style.top = `${pos.y}px`;
        delantero.textContent = (i + 2 + config.defensores.length + config.mediocampistas.length).toString();
        delantero.onclick = () => mostrarInfoJugador(`Delantero ${i + 1}`, 'Marca goles', 'DEL');
        cancha.appendChild(delantero);
    });
}

function mostrarInfoJugador(posicion, descripcion, rol) {
    document.getElementById('jugador-info').innerHTML = `
        <h5 class="posicion-titulo">${posicion} <span class="badge bg-secondary">${rol}</span></h5>
        <p>${descripcion}</p>
        <p><strong>Formación:</strong> ${document.getElementById('formaciones').value}</p>
        <p><strong>Valoración:</strong> 8.5/10</p>
        <p><strong>Últimos partidos:</strong> 3 goles en 5 partidos</p>
    `;
}

function cambiarFormacion() {
    const seleccion = document.getElementById('formaciones').value;
    dibujarAlineacion(seleccion);
}

// Inicializar con la primera formación
window.onload = function() {
    dibujarAlineacion('4-4-2');
};

// Función para mostrar información del jugador
function mostrarInfoJugador(nombre, posicion, rol) {
    document.getElementById('jugador-info').innerHTML = `
        <h5 class="posicion-titulo">${nombre} <span class="badge bg-secondary">${rol}</span></h5>
        <p><strong>Posición:</strong> ${posicion}</p>
        <p><strong>Valoración:</strong> 8.5/10</p>
        <p><strong>Últimos partidos:</strong> 3 goles en 5 partidos</p>
    `;
}

// Orientación correcta del campo (portero abajo)
document.addEventListener('DOMContentLoaded', function() {
    const cancha = document.getElementById('cancha');
    if(cancha) {
        // Añadir elementos gráficos del campo
        cancha.innerHTML += `
            <div class="porteria" style="position:absolute; bottom:10px; left:50%; transform:translateX(-50%); width:100px; height:40px; border:2px solid white; border-bottom:none; opacity:0.3;"></div>
        `;
    }
});

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

