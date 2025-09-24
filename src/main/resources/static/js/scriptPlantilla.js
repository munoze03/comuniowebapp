// Funciones para la seccion de Mi Plantilla
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