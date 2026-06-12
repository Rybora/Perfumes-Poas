let destacados = [];


//OBETENER LOS PERFUMES DESTACADOS
async function cargarDestacados(){
    const respuesta =
        await fetch("Json/catalogo.json");

    const perfumes =
        await respuesta.json();

    destacados =
        perfumes.filter(
            perfume => perfume.destacado
        );

    mostrarDestacados();
}



//LA INFORMACION QUE MUESTRA LA TARJETA
function mostrarDestacados(){

    const contenedor =
        document.getElementById(
            "perfumesDestacados"
        );

    contenedor.innerHTML = "";

    destacados.forEach(perfume => {

        contenedor.innerHTML += `
        <div class="card-destacado">
            <img src="${perfume.imagen}">
            <h3>${perfume.nombre}</h3>
            <p>${perfume.genero}</p>
            <strong>₡${perfume.precio}</strong>
        </div>
        `;
    });
}

//MOVER LA SECCION
function moverSlider(direccion){

    const slider =
        document.getElementById(
            "perfumesDestacados"
        );

    slider.scrollLeft +=
        direccion * 320;
}

//PARA CARGARLOS AL PRINCIPIO
document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarDestacados();

    }
);