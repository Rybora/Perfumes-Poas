//VARIABLE LOCAL PARA PERFUMES
let listaPerfumes = [];
let listaActual = [];

let generoActual = "Todos";
let ordenActual = "default";

//CARGA EL JSON
async function cargarPerfumes() {

    const respuesta = await fetch("Json/catalogo.json");

    listaPerfumes = await respuesta.json();

    listaActual = [...listaPerfumes];

    mostrarPerfumes(listaPerfumes);
}


//PARA MOSTRAR DINAMICAMENTE CADA PERFUME
function mostrarPerfumes(lista) {

    const contenedor = document.getElementById("productos");

    contenedor.innerHTML = "";

    lista.forEach(perfume => {

        contenedor.innerHTML += `
        <div class="card">

            <img src="${perfume.imagen}">

            <h3>${perfume.nombre}</h3>

            <p>${perfume.genero}</p>

            <p>${perfume.tipo}</p>

            <p>${perfume.tamano} ml</p>

            <strong>₡${perfume.precio}</strong>

        </div>
        `;
    });

    //ACTUALIZA EL CONTADOR DE PERFUMES
    document.getElementById("cantidad-productos")
        .textContent =
        `Resultados: ${lista.length} perfumes`;

}


//PARA FILTRAR POR CATEGORIA
function filtrar(genero) {

    generoActual = genero;
    actualizarCatalogo();

}

document.addEventListener("DOMContentLoaded", () => {

    cargarPerfumes();

});


//ACTIVA LA ANIMACION DE LOS BOTONES
function activarBoton(boton){

    document.querySelectorAll(".filtros button")
        .forEach(btn => btn.classList.remove("activo"));

    boton.classList.add("activo");
}


//FILTRAR ORDENAR POR
document
.getElementById("ordenar")
.addEventListener("change", ordenarPerfumes);

function ordenarPerfumes(){

    ordenActual =
        document.getElementById("ordenar").value;

    actualizarCatalogo();

}

//ACTUALIZA EL CATALOGO EN TODAS LAS COMBINACIONES
function actualizarCatalogo() {

    let resultado = [...listaPerfumes];

    // FILTRO DE GENERO

    if (generoActual !== "Todos") {

        resultado = resultado.filter(
            perfume => perfume.genero === generoActual
        );
    }

    // ORDENAMIENTO

    switch (ordenActual) {

        case "precio-menor":

            resultado.sort(
                (a,b) => a.precio - b.precio
            );

            break;

        case "precio-mayor":

            resultado.sort(
                (a,b) => b.precio - a.precio
            );

            break;

        case "nombre":

            resultado.sort(
                (a,b) =>
                a.nombre.localeCompare(b.nombre)
            );

            break;
    }

    listaActual = resultado;

    mostrarPerfumes(listaActual);
}
