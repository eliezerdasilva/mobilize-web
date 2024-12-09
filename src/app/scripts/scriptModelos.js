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
          <div class="car-card">
          <img src="${carro.foto}" alt="Imagem de ${carro.modelo}">
          <div class="car-info">
            <div class="car-name"> ${carro.marca} ${carro.modelo}</div>
            <div class="car-details">${carro.info}</div>
            <div class="price">R$ ${carro.preco}</div>
            <div class="year-km">${carro.ano} • ${carro.km} km</div>
           <div class="localization"><i class="fa-solid fa-location-dot"></i> ${carro.cidade}</div>

            <a href="" class="btn-mostrar btn">Ver parcelas</a>
         </div>
        </div>       `;
    carList.innerHTML += card;
  });
}
// funcao sem funcao
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
  const marca = urlParams.get("marca");
  const search = urlParams.get("search");

  const carros = await carregarCarros();

  let carrosFiltrados = [];

 
  if (categoria === "Carros Usados") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "usado" && carro.tipo === "carro");
    renderCarros(carrosFiltrados)
  } else if (categoria === "Carros Novos") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "novo" && carro.tipo === "carro");
    renderCarros(carrosFiltrados)
  } else if (categoria === "Motos Usadas") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "usado" && carro.tipo === "moto");
    renderCarros(carrosFiltrados)
  } else if (categoria === "Motos Novas") {
    carrosFiltrados = carros.filter(carro => carro.estado.toLowerCase() === "novo" && carro.tipo === "moto");
    renderCarros(carrosFiltrados)
  } else {
    if (categoria === null && marca !== null) {
     renderMarca(marca);
    } else {
      const carrosFiltradosString = localStorage.getItem('carrosFiltrados');
      if (carrosFiltradosString) {
        const carrosFiltrados = JSON.parse(carrosFiltradosString);
        renderCarros(carrosFiltrados);
      }else{
        let carrosFiltrados = carros.filter(carro => 
          carro.marca.toLowerCase().includes(search.toLowerCase())
        );
        
        if (carrosFiltrados.length === 0) {
          carrosFiltrados = carros.filter(carro =>
            carro.modelo.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        renderCarros(carrosFiltrados);
      }

    ;
    }
  }
  
});

window.addEventListener('beforeunload', () => {
  localStorage.removeItem('carrosFiltrados');
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('btn-mostrar')) {
      event.preventDefault();

      const carCard = event.target.closest('.car-card');
      const carData = {
          foto: carCard.querySelector('img').src,
          marca: carCard.querySelector('.car-name').textContent.split(' ')[0],
          modelo: carCard.querySelector('.car-name').textContent.split(' ').slice(1).join(' '),
          info: carCard.querySelector('.car-details').textContent,
          preco: carCard.querySelector('.price').textContent,
          ano: carCard.querySelector('.year-km').textContent.split(' • ')[0],
          km: carCard.querySelector('.year-km').textContent.split(' • ')[1].replace(' km', ''),
          cidade: carCard.querySelector('.localization').textContent.trim()
      };

      localStorage.setItem('selectedCar', JSON.stringify(carData));
      window.location.href = 'buy.html';
  }
});
