function renderCarros(carros) {
  const carList = document.getElementById("car-list");

  if (!carList) {
    console.error('Elemento "car-list" não encontrado.');
    return;
  }

  carList.innerHTML = "";

  if (carros.length === 0) {
    carList.innerHTML = "<p>Nenhum carro encontrado para esta categoria.</p>";
    return;
  }

  carros.forEach((carro) => {
    const card = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="card w-100 h-80" style="width: 18rem;">
                    <img class="card-img-top" src="${carro.foto}" alt="Imagem de ${carro.modelo}">
                    <div class="card-body">
                        <h5 class="card-title">${carro.modelo} (${carro.ano})</h5>
                        <p class="card-text">Marca: ${carro.marca} <br> Combustível: ${carro.combustivel}</p>
                        <a href="#" class="btn btn-primary">Visitar</a>
                    </div>
                </div>
            </div>
        `;
    carList.innerHTML += card;
  });
}

function carregarCarrosNaPaginaResultados() {
  const carrosFiltrados =
    JSON.parse(localStorage.getItem("carrosFiltrados")) || [];
  renderCarros(carrosFiltrados);
}

async function renderMarca(marca) {
  const carros = await carregarCarros();
  const carrosFiltrados = carros.filter(
    (carro) => carro.marca.toLowerCase() === marca.toLowerCase()
  );
  renderCarros(carrosFiltrados);
}
function carregarCarros() {
  return fetch("/src/app/json/carros.json")
    .then((response) => response.json())
    .then((data) => data.carros)
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
      return [];
    });
}
document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");
 
  const carros = await carregarCarros();
  
  let carrosFiltrados = [];

  // Filtra os carros com base na categoria
  if (categoria === "Carros Usados") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "usado" && carro.tipo === "carro");
  } else if (categoria === "Carros Novos") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "novo" && carro.tipo === "carro");
  } else if (categoria === "Motos Usadas") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "usado" && carro.tipo === "moto");
  } else if (categoria === "Motos Novas") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "novo" && carro.tipo === "moto");
    
  } else {
    if (categoria === null) {
      document.addEventListener(
        "DOMContentLoaded",
        carregarCarrosNaPaginaResultados
      );
      console.log("Categoria não selecionada");
    } else {
      console.log("Categoria selecionada:", categoria);
      renderMarca(categoria);
      console.log("Renderizando marca:", categoria);
    }
  }
  renderCarros(carrosFiltrados);
});
