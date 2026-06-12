async function cargarDetalle(){

    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get("id"));

    const respuesta = await fetch("Json/catalogo.json");
    const perfumes = await respuesta.json();

    const perfume = perfumes.find(p => p.id === id);

    if(!perfume){
        document.getElementById("detallePerfume").innerHTML =
            "<h2>Perfume no encontrado</h2>";
        return;
    }

    mostrarDetalle(perfume);
}

function mostrarDetalle(perfume){

    const tamanos = perfume.tamanos || [perfume.tamano];

    document.getElementById("detallePerfume").innerHTML = `
        <div class="detalle-img">
            <img src="${perfume.imagen}" alt="${perfume.nombre}">
        </div>

        <div class="detalle-info">
            <h1>${perfume.nombre}</h1>
            <p class="marca">${perfume.marca}</p>

            <p>${perfume.descripcion}</p>

            <h3>Tamaño</h3>
            <div class="detalle-tamanos">
                ${tamanos.map(t => `<button>${t} ml</button>`).join("")}
            </div>

            <p class="detalle-precio">₡${perfume.precio}</p>

            <button class="btn-detalle-carrito">
                Agregar al carrito
            </button>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", cargarDetalle);