const btnNuevo = document.querySelector("#nuevo");

const apiKey = "7448935c5cb74a6487bc44ca8589c040";
const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8`;

btnNuevo.addEventListener("click", mostrarModalNuevaReceta);

function mostrarModalNuevaReceta() {
    cambiarTituloModal("Nueva Receta");

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.value = "";
    });
}

async function mostrarModalEditarReceta(e) {
    cambiarTituloModal("Editar Receta");

    const idReceta = e.currentTarget.getAttribute("data-id");

    const receta = await getReceta(idReceta);

    document.querySelector("#titulo").value = receta.title;
    document.querySelector("#tiempo").value = receta.readyInMinutes;
    document.querySelector("#usuario").value = receta.sourceName;
    document.querySelector("#foto").value = receta.image;
    document.querySelector("#puntuacion").value = receta.healthScore;
}

async function getReceta(idReceta) {
    const url = `https://api.spoonacular.com/recipes/${idReceta}/information?apiKey=${apiKey}`;

    let response = await fetch(url, {
        method: "GET"
    });

    if (response.status === 200) {
        let receta = await response.json();

        return receta;
    } else {
        alert("algo salio mal");
    }
}

function cambiarTituloModal(titulo) {
    document.querySelector("#modal-recetas .modal-title").innerHTML = titulo;
}

async function cargarRecetas() {
    let response = await fetch(url);

    if (response.status === 200) {
        let recetas = await response.json();

        mostrarRecetasEnTabla(recetas);
    } else {
        alert("Algo salio mal");
    }
}

function mostrarRecetasEnTabla(recetas) {
    const listadoRecetas = document.querySelector("#listado-recetas");

    recetas.recipes.forEach((receta) => {
        listadoRecetas.innerHTML += `
        <tr>
        <td>${receta.id}</td>
        <td>${receta.title}</td>
        <td>${receta.readyInMinutes} minutos</td>
        <td>${receta.sourceName}</td>
        <td><img class="w-50" src="${receta.image}" alt="${receta.title}"></td>
        <td>${receta.healthScore}</td>
        <td>
            <button
                data-id="${receta.id}"
                class="btn btn-success btn-editar mr-2"
                data-toggle="modal"
                data-target="#modal-recetas"
            >
                <i class="fa fa-edit"></i>
            </button>
            <button class="btn btn-danger">
                <i class="fa fa-trash"></i>
            </button>
        </td>
    </tr>
        `;
    });

    const btnEditar = document.querySelectorAll(".btn-editar");

    btnEditar.forEach((btn) => {
        btn.addEventListener("click", mostrarModalEditarReceta);
    });
}

cargarRecetas();
