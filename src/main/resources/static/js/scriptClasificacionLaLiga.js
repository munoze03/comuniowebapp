// FUNCIONES PARA CLASIFICACION DE LA LIGA
// Leer datos desde el script JSON
const clasificacionLaLigaScript = document.getElementById('equiposLaLigaData');
const equipos = JSON.parse(clasificacionLaLigaScript.textContent);  //Lo convertimos en un Array

// Ahora "equipos" es un array de objetos JS
console.log(equipos);

// Grid Options: Contains all of the Data Grid configurations
const gridClasificacionLaLigaOptions = {
    rowData: equipos.map(equipo => ({
        ...equipo,
        posicion: parseInt(equipo.posicion),
        puntos: parseInt(equipo.puntos),
        dg: parseInt(equipo.dg),
        gc: parseInt(equipo.gc),
        gf: parseInt(equipo.gf),
        pe: parseInt(equipo.pe),
        pg: parseInt(equipo.pg),
        pj: parseInt(equipo.pj),
        pp: parseInt(equipo.pp),
    })),
    columnDefs: [
        { field: "posicion",
            headerName: "",
            width: 45 
        },
        { field: "logoUrl",
            headerName: "",
            cellRenderer: (params) => {
                const img = document.createElement("img");
                img.src = params.value;
                img.style.width = "22px";
                img.style.height = "22px";
                return img;
            },
            width: 45,
            sortable: false,
            filter: false
        },
        { field: "nombre",
            headerName: "",
            width: 126,
            sortable: false,
            filter: false
        },
        { field: "puntos",
            headerName: "PUNTOS",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "pj",
            headerName: "PJ",
            comparator: (a, b) => a - b,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center" 
        },
        { field: "pg",
            headerName: "PG",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        { field: "pe",
            headerName: "PE",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        { field: "pp",
            headerName: "PP",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        { field: "gf",
            headerName: "GF",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        { field: "gc",
            headerName: "GC",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        },
        { field: "dg",
            headerName: "DG",
            comparator: (valueA, valueB) => valueA - valueB,
            flex: 1,
            cellClass: "text-center",
            headerClass: "text-center"
        }
    ]
};

// Your Javascript code to create the Data Grid
const myGridClasificacionLaLigaElement = document.querySelector('#tablaClasificacionLaLiga');
agGrid.createGrid(myGridClasificacionLaLigaElement, gridClasificacionLaLigaOptions);

