// parte necessaria para o funcionamento da parte de categorias 
function renderCarros(carros) {
    const carList = document.getElementById('car-list');
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


function adicionarEventos(carros) {

    const divs = document.querySelectorAll('.category');
    divs.forEach(div => {
        div.addEventListener('click', function () {
            const categoria = div.querySelector('p').textContent;
            const carrosFiltrados = buscarCarrosPorCategoria(categoria, carros);
            localStorage.setItem('carrosFiltrados', JSON.stringify(carrosFiltrados));
            
             window.location.href = 'modelos.html';

        });
    });
}
function buscarCarrosPorCategoria(categoria, carros) {
    console.log(carros, categoria)
    return carros.filter(carro => carro.categoria.toLowerCase() === categoria.toLowerCase());
}

document.addEventListener('DOMContentLoaded', async () => {
    const carros = await carregarCarros();
    adicionarEventos(carros);
    
});

function carregarCarros() {
    return fetch('/src/app/json/carros.json')
        .then(response => response.json())
        .then(data => data.carros)
        .catch(error => {
            console.error('Erro ao carregar o arquivo JSON:', error);
            return [];
        });
}
