
document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("auth-button");
    const isLoggedIn = localStorage.getItem("loggedInUser");

    if (isLoggedIn) {
      
        authButton.innerHTML = `

       
        <button class="btn logout-btn" type="button" id="logout">
            Logout
        </button> 
    `;
        
        document.getElementById("dropdownMenu2").style.cssText = `
        color: white;
        background-color: #007bff;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        `;

        document.getElementById("meusDados").style.cssText = `
        color: white;
        background-color: #007bff;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        `;

        document.getElementById("logout").style.cssText = `
        color: white;
        background-color: #007bff;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        `;

        // Adicionar evento de logout
        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("loggedInUser");
            window.location.reload();
        });
        document.getElementById("meusDados").addEventListener("click", () => {
            window.location.replace("login.html");
        });
        
    } else {
        // Mostrar o botão "Entrar" se o usuário não estiver logado
        authButton.innerHTML = `<a href="login.html" class="btn btn-primary">Entrar</a>`;
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Agora o código será executado após o carregamento do DOM
    const buttons = document.querySelectorAll('.marcas');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const categoria = button.textContent.trim();
            console.log(categoria)
            window.location.href = `modelos.html?categoria=${encodeURIComponent(categoria)}`;
        });
    });
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    // Agora o código será executado após o carregamento do DOM
    const buttons = document.querySelectorAll('.compra');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const categoria = button.textContent.trim();
            console.log(categoria)
            window.location.href = `modelos.html?categoria=${encodeURIComponent(categoria)}`;
        });
    });
  });
  