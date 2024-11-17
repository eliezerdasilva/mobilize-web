

fetch('/src/app/json/carros.json')
.then(response => response.json())  
.then(data => {
  renderCarros(data.carros);  
})
.catch(error => {
  console.error('Erro ao carregar o arquivo JSON:', error);
});

 

function renderCarros(carros) {
    const carList = document.getElementById('car-list');
    carros.forEach(carro => {
      const card = `
        <div class="col-lg-4 col-md-6 mb-4" > 
          <div class="card w-100 h-80 " style="width: 18rem;">
            <img class="card-img-top " src="${carro.foto}" alt="Imagem de ${carro.modelo}" >
            <div class="card-body">
              <h5 class="card-title">${carro.modelo} (${carro.ano})</h5>
              <p class="card-text">Marca: ${carro.marca} <br> Combustível: ${carro.combustivel}</p>
              <a href="#" class="btn btn-primary">Visitar</a>
            </div>
          </div>
        </div>
      `;
      carList.innerHTML += card; // Adiciona o card ao contêiner
    });
    
    
  }