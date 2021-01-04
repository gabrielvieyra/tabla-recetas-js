const apiKey = "7448935c5cb74a6487bc44ca8589c040";
const url = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=8`;

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
        <td><img class="w-50" src="${receta.image}"></td>
        <td>${receta.healthScore}</td>
        <td>
            <button
                class="btn btn-success mr-2"
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
}

cargarRecetas();
