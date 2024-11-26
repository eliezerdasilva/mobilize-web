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
            <button class="btn view-details" data-index="${index}">Ver parcelas</button>
          </div>
        </div>
      `;
      carListContainer.insertAdjacentHTML("beforeend", carCard);
    });
  
    // Adiciona evento de clique em "Ver parcelas"
    document.querySelectorAll(".view-details").forEach(button => {
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
  

  fetch('/src/app/json/carros.json')
    .then(response => response.json())
    .then(data => renderCarros(data.carros))
    .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));
});
