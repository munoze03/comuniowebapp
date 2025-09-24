// FUNCIONES PARA SECCION OFERTAS
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