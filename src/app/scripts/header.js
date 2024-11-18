
document.addEventListener("DOMContentLoaded", () => {
    const authButton = document.getElementById("auth-button");
    const isLoggedIn = localStorage.getItem("loggedInUser");

    if (isLoggedIn) {
        // Mostrar o menu "Perfil" se o usuário estiver logado
        authButton.innerHTML = `
        <button class="btn bg-light dropdown-toggle" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
            Perfil
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <li><button class="dropdown-item" id="meusDados" type="button">Meus Dados</button></li>
            <li><button class="dropdown-item" id="logout" type="button">Logout</button></li>
        </ul>`;

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
  