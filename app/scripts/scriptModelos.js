function renderCarros(carros) {
  const carList = document.getElementById("car-listing");

  if (!carList) {
    console.error('Elemento "car-listing" não encontrado.');
    return;
  }

  carList.innerHTML = carros.length
    ? carros.map(carro => `
        <div class="car-card">
          <img src="${carro.foto}" alt="Imagem de ${carro.modelo}">
          <div class="car-info">
            <div class="car-name"> ${carro.marca} ${carro.modelo}</div>
            <div class="car-details">${carro.info}</div>
            <div class="price">R$ ${carro.preco}</div>
            <div class="year-km">${carro.ano} • ${carro.km} km</div>
            <div class=""localization><i class="fa-solid fa-location-dot"></i>  ${carro.cidade}</div>
            <a href="buy.html" class="btn">Ver parcelas</a>
         </div>
        </div>`).join('')
    : "<p>Nenhum carro encontrado para esta categoria.</p>";
}

async function carregarCarros() {
  try {
    const response = await fetch("/src/app/json/carros.json");
    const data = await response.json();
    return data.carros;
  } catch (error) {
    console.error("Erro ao carregar o arquivo JSON:", error);
    return [];
  }
}

async function initPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoria = urlParams.get("categoria");
  const marca = urlParams.get("marca");
  const carros = await carregarCarros();

  let carrosFiltrados = carros.filter(carro => {
    if (categoria) {
      return carro.tipo === categoria.split(' ')[1].toLowerCase() &&
             carro.estado.toLowerCase() === categoria.split(' ')[0].toLowerCase();
    }
    return marca ? carro.marca.toLowerCase() === marca.toLowerCase() : true;
  });

  renderCarros(carrosFiltrados);
}

document.addEventListener("DOMContentLoaded", initPage);
