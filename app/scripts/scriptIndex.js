// parte necessaria para o funcionamento da parte de categorias
function renderCarros(carros) {
  const carList = document.getElementById("car-list");
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

function adicionarEventos(carros) {
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", (event) => {
      event.preventDefault();
      const figcaption = category.querySelector("figcaption");
      const categoria = figcaption ? figcaption.dataset.categoria : null;
      const carrosFiltrados = buscarCarrosPorCategoria(categoria, carros);
      console.log(categoria);
      localStorage.setItem("carrosFiltrados", JSON.stringify(carrosFiltrados));
      window.location.href = 'modelos.html';
    });
  });
}
function buscarCarrosPorCategoria(categoria, carros) {
  return carros.filter(
    (carro) => carro.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

document.addEventListener("DOMContentLoaded", async () => {
  const carros = await carregarCarros();

  adicionarEventos(carros);
});

function carregarCarros() {
  return fetch("/src/app/json/carros.json")
    .then((response) => response.json())
    .then((data) => data.carros)
    .catch((error) => {
      console.error("Erro ao carregar o arquivo JSON:", error);
      return [];
    });
}
// Redireciona para marcas
function redirectToModel(element) {
  if (!element) {
    console.error("Elemento não encontrado!");
    return;
  }
  const h2Element = element.querySelector("h2");
  if (!h2Element) {
    console.error("Elemento <h2> não encontrado dentro da div!");
    return;
  }
  const brandName = h2Element.innerText;
  const encodedBrand = encodeURIComponent(brandName);
  window.location.href = `modelos.html?marca=${encodedBrand}`;
}
