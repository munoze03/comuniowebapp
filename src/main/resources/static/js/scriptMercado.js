// FUNCIONES PARA SECCION MERCADO
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
