// FUNCIONES DE CLASIFICACION
// Selector Clasificacion
document.addEventListener("DOMContentLoaded", function () {
    const btnTotal = document.getElementById("btnTotal");
    const btnJornada = document.getElementById("btnJornada");
    const btnLive = document.getElementById("btnLive");
    const btnMes = document.getElementById("btnMes");
    const tbody = document.querySelector("table.table tbody");

    btnTotal.addEventListener("click", function () {
        
        btnTotal.classList.add("btn-success");
        btnTotal.classList.remove("btn-outline-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-live").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Ocultar el selector y reiniciarlo
        document.getElementById("selectorMesContainer").classList.add("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");
        
        ordenarTabla("tipo-total");
    });

    btnJornada.addEventListener("click", function () {
        btnJornada.classList.add("btn-success");
        btnJornada.classList.remove("btn-outline-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");

        document.querySelectorAll(".tipo-live").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-total").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-mes").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Ocultar el selector y reiniciarlo
        document.getElementById("selectorMesContainer").classList.add("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");
        
        ordenarTabla("tipo-jornada");
    });

    btnLive.addEventListener("click", function (){
        btnLive.classList.add("btn-success");
        btnLive.classList.remove("btn-outline-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnMes.classList.add("btn-outline-success");
        btnMes.classList.remove("btn-success");
        

        document.querySelectorAll(".tipo-total").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-jornada").forEach(e => e.classList.add("d-none"));
        document.querySelectorAll(".tipo-live").forEach(e => e.classList.remove("d-none"));
        document.querySelectorAll(".tipo-mes").forEach(e => e.classList.add("d-none"));

        // 👉 Mostrar tabla completa
        document.getElementById("tablaClasificacion").classList.remove("d-none");

        // 👉 Ocultar el selector y reiniciarlo
        document.getElementById("selectorMesContainer").classList.add("d-none");

        // 👉 Mostrar tbodyMes y ocultar tbody normal
        document.getElementById("tbodyMes").classList.add("d-none");
        document.getElementById("tbody").classList.remove("d-none");

        ordenarTabla("tipo-live");
    })

    btnMes.addEventListener("click", function (){
        // Cambiar estilos de botones como ya haces
        btnLive.classList.add("btn-outline-success");
        btnLive.classList.remove("btn-success");
        btnJornada.classList.add("btn-outline-success");
        btnJornada.classList.remove("btn-success");
        btnTotal.classList.add("btn-outline-success");
        btnTotal.classList.remove("btn-success");
        btnMes.classList.add("btn-success");
        btnMes.classList.remove("btn-outline-success");

        // 👉 Ocultar tabla completa
        document.getElementById("tablaClasificacion").classList.add("d-none");

        // 👉 Mostrar selector de mes
        document.getElementById("selectorMesContainer").classList.remove("d-none");
    });

    document.getElementById("selectorMes").addEventListener("change", async function () {
        const mesSeleccionado = this.value;
        if (!mesSeleccionado) return;

        try {
            const response = await fetch(`/clasificacion/mes/${mesSeleccionado}`);
            if (!response.ok) throw new Error("Error al obtener la clasificación");
            
            const html = await response.text();
            document.querySelector("#tablaClasificacion #tbodyMes").innerHTML = html;

            // 👉 Ocultar el selector y reiniciarlo
            const selectorMes = document.getElementById("selectorMes");
            selectorMes.value = "";
            document.getElementById("selectorMesContainer").classList.add("d-none");

            // 👉 Mostrar la tabla
            document.getElementById("tablaClasificacion").classList.remove("d-none");

            // 👉 Mostrar tbodyMes y ocultar tbody normal
            document.getElementById("tbodyMes").classList.remove("d-none");
            document.getElementById("tbody").classList.add("d-none");

        } catch (err) {
            console.error(err);
            alert("No se pudo cargar la clasificación del mes seleccionado.");
        }
    });

    function ordenarTabla(tipo) {
        // tipo: "tipo-total" o "tipo-jornada"
        const rows = Array.from(tbody.querySelectorAll("tr"));
        rows.sort((a, b) => {
            const aVal = parseInt(a.querySelector(`.${tipo}`).textContent) || 0;
            const bVal = parseInt(b.querySelector(`.${tipo}`).textContent) || 0;
            return bVal - aVal; // descendente
        });
        // Vuelve a poner las filas en el orden correcto
        rows.forEach((row, idx) => {
            // Actualizar el número de posición visual si quieres:
            const posCell = row.querySelector("td:first-child span");
            if (posCell) posCell.textContent = idx + 1;
            tbody.appendChild(row);
        });
    }

    // Orden inicial por puntos totales:
    ordenarTabla("tipo-total");
});

// FUNCIONES PARA CONTROLAR MODAL DE PLANTILLA USUARIOS AL PULSAR EN CLASIFICACION
let userId;
let userName;
// Funcion que recoge UserId desde el boton de la tabla de clasificacion
document.addEventListener("DOMContentLoaded", function () {
    const tbody = document.getElementById("tbody");

    tbody.addEventListener("click", function (e) {
        let row = e.target.closest("tr"); // detecta la fila

        if (!row) return;

        // Verificar si está activa la pestaña "Jornada" o "Live"
        const btnJornada = document.getElementById("btnJornada");
        const btnLive = document.getElementById("btnLive");

        const jornadaActiva = btnJornada.classList.contains("btn-success");
        const liveActiva = btnLive.classList.contains("btn-success");

        // if (jornadaActiva || liveActiva) {
            userId = row.getAttribute("data-userid"); // saca el id
            userName = row.getAttribute("data-username"); // saca el nombre

            // Establecemos el nombre del usuario en el modal
            const alineacionUsuario = document.getElementById("alineacionUsuario");
            if(jornadaActiva || liveActiva){
                alineacionUsuario.textContent = `Alineación de ${userName}`;
            }else{
                alineacionUsuario.textContent = `Plantilla de ${userName}`;
            }

            // Llamamos a la función que renderiza la alineación del jugador
            renderAlineacionJugador(userId, "tablaPlantilla");

            // Muestra el modal de Bootstrap
            let modal = new bootstrap.Modal(document.getElementById("plantillaUsuario"));
            modal.show();
        // } 
    });

});

async function cargarAlineacionJugador(userId){
    
    const response = await fetch(`/clasificacion/plantilla/${userId}`);
    if (!response.ok) throw new Error("Error en la petición: " + response.status);

    const plantilla = await response.json();
    return plantilla; // devuelve el objeto data
}

async function renderAlineacionJugador(userId, containerId) {
    const loading = document.getElementById("loading");

    try {
        // Mostrar spinner
        loading.classList.remove("d-none");

        // Llamamos a la función que carga los datos
        const plantillaJugador = await cargarAlineacionJugador(userId);

        // Verificar si está activa la pestaña "Jornada" o "Live"
        const btnJornada = document.getElementById("btnJornada");
        const btnLive = document.getElementById("btnLive");
        const btnTotal = document.getElementById("btnTotal");
        const btnMes = document.getElementById("btnMes");

        const jornadaActiva = btnJornada.classList.contains("btn-success");
        const liveActiva = btnLive.classList.contains("btn-success");
        const totalActiva = btnTotal.classList.contains("btn-success");
        const mesActiva = btnMes.classList.contains("btn-success");

        const container = document.getElementById(containerId);
        if (!container) return; // si no existe el contenedor, salir

        container.innerHTML = ""; // limpiar contenido anterior

        for(let i = 0; i < plantillaJugador.length; i++){
            const row = document.createElement("tr");
            row.classList.add("align-middle");

            if((jornadaActiva || liveActiva) && plantillaJugador[i].linedup == true){
                const tdPosicion = document.createElement("td");
                tdPosicion.textContent = plantillaJugador[i].posicion;
                row.appendChild(tdPosicion)

                const tdFoto = document.createElement("td");
                tdFoto.classList.add("ocultar-portrait");

                // Crear el elemento <img>
                const img = document.createElement("img");
                img.src = plantillaJugador[i].hrefFoto; // URL de la imagen
                img.alt = plantillaJugador[i].nombre;
                img.className = "rounded-circle fotoPlantilla";   
                img.style.width = "30px";               // ancho opcional
                img.style.height = "30px";              // alto opcional
                img.style.objectFit = "cover";          // para que no se deforme

                // Añadir la imagen a la celda
                tdFoto.appendChild(img);
                row.appendChild(tdFoto);


                const tdNombre = document.createElement("td");
                tdNombre.textContent = plantillaJugador[i].name;
                row.appendChild(tdNombre)


                const tdFotoClub = document.createElement("td");
                // Crear el elemento <img>
                const imgClub = document.createElement("img");
                imgClub.src = plantillaJugador[i].hrefClubLogo; // URL de la imagen
                imgClub.alt = plantillaJugador[i].club;
                imgClub.className = "fotoPlantilla";   
                imgClub.style.width = "30px";               // ancho opcional
                imgClub.style.height = "30px";              // alto opcional
                imgClub.style.objectFit = "cover";          // para que no se deforme

                // Añadir la imagen a la celda
                tdFotoClub.appendChild(imgClub);
                row.appendChild(tdFotoClub);

                const tdPuntos = document.createElement("td");
                if(plantillaJugador[i].ultimosPuntos != ""){
                    tdPuntos.textContent = plantillaJugador[i].ultimosPuntos;
                } else{
                    tdPuntos.textContent = "-"
                }
                row.appendChild(tdPuntos)

                container.appendChild(row);``
            }else{
                if(totalActiva || mesActiva){
                    const tdPosicion = document.createElement("td");
                    tdPosicion.textContent = plantillaJugador[i].posicion;
                    row.appendChild(tdPosicion)

                    const tdFoto = document.createElement("td");
                    tdFoto.classList.add("ocultar-portrait");
                    // Crear el elemento <img>
                    const img = document.createElement("img");
                    img.src = plantillaJugador[i].hrefFoto; // URL de la imagen
                    img.alt = plantillaJugador[i].nombre;
                    img.className = "rounded-circle fotoPlantilla";   
                    img.style.width = "30px";               // ancho opcional
                    img.style.height = "30px";              // alto opcional
                    img.style.objectFit = "cover";          // para que no se deforme

                    // Añadir la imagen a la celda
                    tdFoto.appendChild(img);
                    row.appendChild(tdFoto);


                    const tdNombre = document.createElement("td");
                    tdNombre.textContent = plantillaJugador[i].name;
                    row.appendChild(tdNombre)


                    const tdFotoClub = document.createElement("td");
                    // Crear el elemento <img>
                    const imgClub = document.createElement("img");
                    imgClub.src = plantillaJugador[i].hrefClubLogo; // URL de la imagen
                    imgClub.alt = plantillaJugador[i].club;
                    imgClub.className = "rounded-circle fotoPlantilla";   
                    imgClub.style.width = "30px";               // ancho opcional
                    imgClub.style.height = "30px";              // alto opcional
                    imgClub.style.objectFit = "cover";          // para que no se deforme

                    // Añadir la imagen a la celda
                    tdFotoClub.appendChild(imgClub);
                    row.appendChild(tdFotoClub);

                    const tdPuntos = document.createElement("td");
                    if(plantillaJugador[i].puntosTotales != ""){
                        tdPuntos.textContent = plantillaJugador[i].puntosTotales;
                    } else{
                        tdPuntos.textContent = "-"
                    }
                    row.appendChild(tdPuntos)

                    container.appendChild(row);``
                }
            }
        }
    } catch (error) {
        console.error(error);
    } finally {
        // Ocultar spinner
        loading.classList.add("d-none");
    }
    
}