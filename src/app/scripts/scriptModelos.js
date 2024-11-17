function renderCarros(carros) {
    const carList = document.getElementById('car-list');
    
    
    if (!carList) {
        console.error('Elemento "car-list" não encontrado.');
        return;
    }

    carList.innerHTML = '';

    if (carros.length === 0) {
        carList.innerHTML = '<p>Nenhum carro encontrado para esta categoria.</p>';
        return;
    }

    carros.forEach(carro => {
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
    const carrosFiltrados = JSON.parse(localStorage.getItem('carrosFiltrados')) || [];
    renderCarros(carrosFiltrados);
}

document.addEventListener('DOMContentLoaded', carregarCarrosNaPaginaResultados);
