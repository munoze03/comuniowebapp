// FUNCIONES PARA LA TABLA DE ESTADISTICAS DE JUGADORES
// Leer datos desde el script JSON
const jugadoresScript = document.getElementById('jugadoresData');
const jugadores = JSON.parse(jugadoresScript.textContent); //Lo convertimos en un Array

// AG-Grid Options: Contains all of the Data Grid configurations
const gridOptions = {
    rowData: jugadores.map(jugador => ({
        ...jugador,
        puntos: parseInt(jugador.puntos),
        media: parseFloat(jugador.media),
        valor: parseFloat(jugador.valor.replace(/\./g, '')) // si viene como string
    })),
    columnDefs: getColumnDefs(),
    onRowClicked: params => {
        // Llenar datos del modal
        document.getElementById("jugadorNombre").textContent = params.data.nombre;
        document.getElementById("jugadorPuntos").textContent = params.data.puntos;
        document.getElementById("jugadorMediaPuntos").textContent = params.data.media;
        document.getElementById("jugadorPrecio").textContent = new Intl.NumberFormat('es-ES').format(params.data.valor) + "€";
        document.getElementById("jugadorPosicion").textContent = params.data.posicion;
        document.getElementById("jugadorPosicion").classList.add("pos-" + params.data.posicion);
        document.getElementById("clubEscudo").src = params.data.equipoLogo;
        // Llamamos a la API para obtener más datos del jugador
        fetch(`/estadisticas/datosJugador/${params.data.nombre}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("jugadorFoto").src = data.hrefFoto;
            document.getElementById("jugadorEstado").textContent = data.estado;
            document.getElementById("jugadorInfoEstado").textContent = data.infoEstado;
            document.getElementById("jugadorGolesTotales").textContent = data.golesTotales;
            document.getElementById("jugadorGolesPenalti").textContent = data.golesPenalti;
            document.getElementById("jugadorTarjetasAmarillas").textContent = data.tarjetasAmarillas;
            document.getElementById("jugadorTarjetasRojas").textContent = data.tarjetasRojas;
            document.getElementById("jugadorTarjetasAmarRoja").textContent = data.tarjetasAmarRoja;
            document.getElementById("jugadorPartidosJugados").textContent = data.partidosJugados
            document.getElementById("jugadorHistoricoPuntos").textContent = data.propietario.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
            document.getElementById("jugadorHistoricoPuntosTitulo").innerHTML = "<strong>Propietario:</strong>";
            iconoEstado(data.estado);
        })
        .catch(error => console.error("Error:", error));


        // Mostrar modal (Bootstrap 5)
        const modal = new bootstrap.Modal(document.getElementById("jugadorModal"));
        modal.show();
    }
};

// Funcion para definir las columnas del AG-Grid
function getColumnDefs(){
    if (window.innerWidth < 900) { // si es "estrecho" (vertical)
        return [
            { field: "posicion", headerName: "", width: 40 },
            { field: "equipoLogo", headerName: "", cellRenderer: (params) => {
                    const img = document.createElement("img");
                    img.src = params.value;
                    img.style.width = "22px";
                    img.style.height = "22px";
                    return img;
                }, width: 45 },
            { field: "nombre", headerName: "Nombre", width: 130 },
            { field: "puntos", headerName: "PTS", comparator: (valueA, valueB) => valueA - valueB, width: 50, cellClass: "text-center", headerClass: "text-center" },
            { field: "media", comparator: (a, b) => a - b, width: 60, cellClass: "text-center", headerClass: "text-center" },
            { field: "valor", comparator: (valueA, valueB) => valueA - valueB, valueFormatter: (params) => {
                    if (params.value == null) return "";
                    return new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                    }).format(params.value);
                }, width: 95, cellClass: "text-center", headerClass: "text-center" },
            {field: "racha", headerName: "Racha", width: 150,
                cellRenderer: (params) => {
                    const valores = params.value; // asumimos un array de 5 números
                    // Crear contenedor
                    const container = document.createElement("div");
                    container.style.display = "flex";
                    container.style.gap = "2px"; // espacio entre celdas
                    container.style.height = "100%";   // 🔹 Ocupar toda la celda
                    
                    valores.forEach(val => {
                    const cell = document.createElement("div");
                    cell.style.width = "20px";
                    cell.style.height = "20px";
                    cell.style.display = "flex";
                    cell.style.alignItems = "center";
                    cell.style.justifyContent = "center";
                    cell.style.color = "white";
                    cell.style.fontSize = "12px";
                    cell.style.borderRadius = "2px";
                    
                    // Fondo según valor
                    if (val <= 0) cell.style.backgroundColor = "red";
                    else if (val >= 1 && val <= 4) cell.style.backgroundColor = "orange";
                    else if (val >= 5 && val <= 9) cell.style.backgroundColor = "green";
                    else if (val >= 10) cell.style.backgroundColor = "blue";
                    else if (val == "-") cell.style.backgroundColor = "Grey";
                    
                    cell.textContent = val;
                    container.appendChild(cell);
                    });
                    
                    return container;
                }, sortable: false, filter: false }
        ];
    } else{
        return [
            { field: "posicion", headerName: "", width: 45 },
            { field: "equipoLogo", headerName: "", cellRenderer: (params) => {
                    const img = document.createElement("img");
                    img.src = params.value;
                    img.style.width = "22px";
                    img.style.height = "22px";
                    return img;
                }, width: 45 },
            { field: "nombre", headerName: "Nombre", flex: 1 },
            { field: "puntos", comparator: (valueA, valueB) => valueA - valueB, flex: 1, cellClass: "text-center", headerClass: "text-center" },
            { field: "media", comparator: (a, b) => a - b, flex: 1, cellClass: "text-center", headerClass: "text-center" },
            { field: "valor", comparator: (valueA, valueB) => valueA - valueB, valueFormatter: (params) => {
                    if (params.value == null) return "";
                    return new Intl.NumberFormat("es-ES", {
                    style: "currency",
                    currency: "EUR",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                    }).format(params.value);
                }, flex: 1, cellClass: "text-center", headerClass: "text-center" },
            {field: "racha", headerName: "Racha", width: 150,
                cellRenderer: (params) => {
                    const valores = params.value; // asumimos un array de 5 números
                    // Crear contenedor
                    const container = document.createElement("div");
                    container.style.display = "flex";
                    container.style.gap = "2px"; // espacio entre celdas
                    container.style.height = "100%";   // 🔹 Ocupar toda la celda
                    
                    valores.forEach(val => {
                    const cell = document.createElement("div");
                    cell.style.width = "20px";
                    cell.style.height = "20px";
                    cell.style.display = "flex";
                    cell.style.alignItems = "center";
                    cell.style.justifyContent = "center";
                    cell.style.color = "white";
                    cell.style.fontSize = "12px";
                    cell.style.borderRadius = "2px";
                    
                    // Fondo según valor
                    if (val <= 0) cell.style.backgroundColor = "red";
                    else if (val >= 1 && val <= 4) cell.style.backgroundColor = "orange";
                    else if (val >= 5 && val <= 9) cell.style.backgroundColor = "green";
                    else if (val >= 10) cell.style.backgroundColor = "blue";
                    else if (val == "-") cell.style.backgroundColor = "Grey";
                    
                    cell.textContent = val;
                    container.appendChild(cell);
                    });
                    
                    return container;
                }, sortable: false, filter: false }
        ];
    }
}

// JS para inicializar la tabla de estadisticas de jugadores
const myGridElement = document.querySelector('#tablaJugadores');
agGrid.createGrid(myGridElement, gridOptions);

// FUNCIONES PARA CALENDARIO LA LIGA
document.addEventListener("DOMContentLoaded", () => {
        const slides = document.querySelectorAll(".jornada-slide");
        let currentIndex = 0;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.toggle("active", i === index);
            });
        }

        document.getElementById("prevBtn").addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(currentIndex);
        });

        document.getElementById("nextBtn").addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slides.length;
            showSlide(currentIndex);
        });

        showSlide(currentIndex);
});

function iconoEstado(estado){
    const spanEstado = document.getElementById("iconoLesion");
    switch (estado) {
        case "SIN PROBLEMAS":
            spanEstado.innerHTML = "";
            break;

        case "LESIONADO -":
            spanEstado.innerHTML = '<img src="/assets/iconoLesion.png" alt="Lesionado" width="30px" height="30px">';
            spanEstado.style.display = "inline-block";
            break;

        case "TOCADO":
            spanEstado.innerHTML = '<i class="bi bi-question-circle-fill fs-4 text-warning"></i>';
            spanEstado.style.display = "inline-block";
            break;

        case "NO CONVOCADO":
            break;

        case "OTROS":
            spanEstado.innerHTML = '<img src="/assets/iconoOtros.png" alt="Duda" width="30px" height="30px">';
            spanEstado.style.display = "inline-block";
            break;

        case "SANCIONADO":
            spanEstado.innerHTML = '<i class="bi bi-file-fill fs-4 text-danger"></i>';
            spanEstado.style.display = "inline-block";
            break;
        
        case "NO CONVOCADO":
            spanEstado.innerHTML = '<img src="/assets/iconoOtros.png" alt="Duda" width="30px" height="30px">';
            spanEstado.style.display = "inline-block";
            break;

        case "ROJA DIRECTA":
            spanEstado.innerHTML = '<i class="bi bi-file-fill fs-4 text-danger"></i>';
            spanEstado.style.display = "inline-block";
            break;

        default:
            break;
    }
}