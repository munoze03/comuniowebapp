// FUNCIONES DE LA SECCION DE NOTICIAS
// Boton de Mostrar anteriores de seccion noticias
function toggleNoticias() {
    const extras = document.querySelectorAll('.extra-noticia');
    const btn = document.getElementById('toggleNoticiasBtn');
    const isHidden = extras[0]?.classList.contains('d-none');

    extras.forEach(e => e.classList.toggle('d-none'));
    btn.textContent = isHidden ? 'Mostrar menos' : 'Mostrar más';
}