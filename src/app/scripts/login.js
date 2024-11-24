if (window.location.pathname.includes("login.html")) {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
       
        
        const response = await fetch("/src/app/json/usuarios.json");
        const users = await response.json();
        console.log(users);
        const user = users.find(user => user.email === username && user.senha === password);

        if (user) {
            console.log("entrei")
            localStorage.setItem("loggedInUser", username);
            window.location.href = "index.html";
        } else {
            document.getElementById("error-message").textContent = "Usuário ou senha incorretos!";
        }
    });
}
