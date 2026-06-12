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


            <a href="detalle.html?id=${perfume.id}" class="card-link">
                <img src="${perfume.imagen}" alt="${perfume.nombre}">

                <div class="card-info">
                    <h3>${perfume.nombre}</h3>
                    <p class="card-tipo">${perfume.tipo}</p>
                </div>
            </a>

            <div class="card-extra">

                <p>${perfume.genero}</p>

                <div class="tamanos">
                    ${perfume.tamanos.map(t => `<span>${t} ml</span>`).join("")}
                </div>

                <div class="card-bottom">

                    <p class="precio">₡${perfume.precio}</p>

                    <button class="add-to-cart" type="button">
                        <span class="btn-label">Add to cart</span>

                        <span class="cart-wrap">
                            <i class="fa-solid fa-cart-shopping cart-icon"></i>
                            <span class="item-drop"></span>
                                <i class="fa-solid fa-check check-icon"></i>
                            </span>
                    </button>
                </div>
            </div>
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


//ANIMACION PARA BOTON DEL CARRITO
document.addEventListener("click", function(e){

    const boton = e.target.closest(".add-to-cart");

    if(!boton) return;

    boton.classList.add("animar");

    setTimeout(() => {
        boton.classList.remove("animar");
    }, 1800);
});