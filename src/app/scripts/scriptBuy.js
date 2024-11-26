document.addEventListener("DOMContentLoaded", () => {
    
    const selectedCar = JSON.parse(localStorage.getItem("selectedCar"));
    console.log(selectedCar)
    if (!selectedCar) {
      console.error("Nenhum carro foi selecionado!");
      return;
    }
  
   




    document.getElementById("foto01").src = selectedCar.foto;
    document.querySelector(".product-title h2").textContent = selectedCar.modelo;
    document.querySelector(".product-price .offer-price").textContent = ` R$ : ${selectedCar.preco}`;
    document.querySelector(".product-details p").innerHTML = ` <b>Combustivel</b> : ${selectedCar.combustivel} <br> <b>Ano</b> : ${selectedCar.ano} <br><b>Quilometragem </b>: ${selectedCar.km} <br><b>  Cambio </b>: ${selectedCar.cambio} ` ;
    document.querySelector(".active").textContent = selectedCar.marca
  
 
  });
  