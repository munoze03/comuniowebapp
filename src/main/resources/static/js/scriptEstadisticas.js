// FUNCIONES PARA LA TABLA DE ESTADISTICAS DE JUGADORES
// Leer datos desde el script JSON
const jugadoresScript = document.getElementById('jugadoresData');
const jugadores = JSON.parse(jugadoresScript.textContent); //Lo convertimos en un Array

// Grid Options: Contains all of the Data Grid configurations
const gridOptions = {
    rowData: jugadores.map(jugador => ({
        ...jugador,
        puntos: parseInt(jugador.puntos),
        media: parseFloat(jugador.media),
        valor: parseFloat(jugador.valor.replace(/\./g, '')) // si viene como string
        })),
    columnDefs: [
        { field: "posicion",
            headerName: "",
            width: 45 
        },
        { field: "equipoLogo",
            headerName: "",
            cellRenderer: (params) => {
                const img = document.createElement("img");
                img.src = params.value;
                img.style.width = "22px";
                img.style.height = "22px";
                return img;
            },
            width: 45
        },
        { field: "nombre",
            headerName: "Nombre",
            flex: 1 
        },
        { field: "puntos",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "media",
            comparator: (a, b) => a - b,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "valor",
            comparator: (valueA, valueB) => valueA - valueB,
            valueFormatter: (params) => {
                if (params.value == null) return "";
                return new Intl.NumberFormat("es-ES", {
                style: "currency",
                currency: "EUR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
                }).format(params.value);
            },
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        {field: "racha",
            headerName: "Racha",
            width: 150,
            cellRenderer: (params) => {
                const valores = params.value; // asumimos un array de 5 números
                // Crear contenedor
                const container = document.createElement("div");
                container.style.display = "flex";
                container.style.gap = "2px"; // espacio entre celdas
                
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
            },
            sortable: false,
            filter: false
        }
    ]
};

// Your Javascript code to create the Data Grid
const myGridElement = document.querySelector('#tablaJugadores');
agGrid.createGrid(myGridElement, gridOptions);

