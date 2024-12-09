document.addEventListener("DOMContentLoaded", () => {
  const carListContainer = document.getElementById("car-list");
  if (!carListContainer) {
    console.error('Elemento "car-list" não encontrado no DOM!');
    return;
  }
  function renderCarros(carros) {
    const carListContainer = document.getElementById("car-list");
    carListContainer.innerHTML = ""; // Limpa o container antes de renderizar

    carros.forEach((carro, index) => {
      const carCard = `
        <div class="car-card" data-index="${index}">
          <img src="${carro.foto}" alt="${carro.foto}">
          <div class="car-info">
            <div class="car-name">${carro.modelo}</div>
            <div class="car-details">Combustivel ${carro.combustivel}</div>
            <div class="price">${carro.preco}</div>
            <div class="year-km">KM ${carro.km}</div>
            <div class="localization"><i class="fa-solid fa-location-dot"></i> ${carro.cidade}</div>
            <button class="btn view-details" data-index="${index}">Ver</button>
          </div>
        </div>
      `;
      carListContainer.insertAdjacentHTML("beforeend", carCard);
    });

    // Adiciona evento de clique em "Ver parcelas"
    document.querySelectorAll(".view-details").forEach((button) => {
      button.addEventListener("click", (event) => {
        const carIndex = event.target.dataset.index;
        const selectedCar = carros[carIndex];

        // Salvar os dados do carro no localStorage
        localStorage.setItem("selectedCar", JSON.stringify(selectedCar));

        // Redirecionar para a página buy.html
        window.location.href = "buy.html";
      });
    });
  }
  const searchButton = document.getElementById("search_btn");
  const searchInput = document.getElementById("search");

  let carros = [];
  // Carregar os carros do arquivo JSON
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "/src/app/json/carros.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = JSON.parse(xhr.responseText);
      carros = data.carros;
      renderCarros(carros);
    } else {
      console.error("Erro ao carregar o arquivo JSON");
    }
  };

  xhr.send();

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("ee");
    const query = searchInput.value.trim();

    if (query && query !== "") {
      console.log("Filtrando carros...");

      const carrosFiltrados = carros.filter(
        (carro) =>
          carro.marca.toLowerCase().includes(query.toLowerCase()) ||
          carro.modelo.toLowerCase().includes(query.toLowerCase())
      );

      renderCarros(carrosFiltrados);
    } else {
      console.log("Sem filtro");
      renderCarros(carros);
    }
  });
});
