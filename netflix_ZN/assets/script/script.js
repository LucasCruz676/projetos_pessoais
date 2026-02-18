function logar() { 
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    if(login === "admin" && senha === "admin123") {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html"; 
    } else {
        alert("Login ou senha incorretos.");
    }           

}