//VARIABLE LOCAL PARA PERFUMES
let listaPerfumes = [];


//CARGA EL JSON
async function cargarPerfumes() {

    const respuesta = await fetch("Json/catalogo.json");

    listaPerfumes = await respuesta.json();

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

    if (genero === "Todos") {

        mostrarPerfumes(listaPerfumes);
        return;
    }

    const filtrados = listaPerfumes.filter(
        perfume => perfume.genero === genero
    );

    mostrarPerfumes(filtrados);
}


document.addEventListener("DOMContentLoaded", () => {

    cargarPerfumes();

});

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

    const tipo =
        document.getElementById("ordenar").value;

    let copia = [...listaPerfumes];

    switch(tipo){

        case "precio-menor":

            copia.sort(
                (a,b) => a.precio - b.precio
            );

            break;

        case "precio-mayor":

            copia.sort(
                (a,b) => b.precio - a.precio
            );

            break;

        case "nombre":

            copia.sort(
                (a,b) =>
                a.nombre.localeCompare(b.nombre)
            );

            break;
    }

    mostrarPerfumes(copia);
}
