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