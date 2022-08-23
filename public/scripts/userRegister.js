const form = document.getElementById("userRegisterForm");
form.addEventListener("submit", submitSellerRegister);

function submitSellerRegister(e) {
    e.preventDefault();
    const info = document.getElementById("info") 

    const name = document.getElementById("name")
    const surname = document.getElementById("surname")
    const email = document.getElementById("eMail")
    const password = document.getElementById("password")
    const passwordAgain = document.getElementById("passwordAgain")

    if (password.value === passwordAgain.value) {
        const data = {
            name: name.value,
            surname: surname.value,
            email: email.value,
            password: password.value,
            passwordAgain: passwordAgain.value
        }

        fetch("http://127.0.0.1:3002/userRegister", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(data => {
                if (data.message === 'OK') {
                    name.value = null
                    surname.value = null
                    email.value = null
                    password.value = null
                    passwordAgain.value = null

                    info.innerHTML = "Successfully registered. Redirecting to login page..."
                    window.location.href= '/login'

                } else if (data.message === "passwords does not match") {
                    info.innerHTML = "Passwords does not match"
                } else if (data.message === "email already registered") {
                    info.innerHTML = "Email Already Registered"
                } else {
                    info.innerHTML = "Server Fail. Try Again Later"
                }
            })
            .catch((err) => ("Error occured", err));
    } else {
        info.innerHTML = "Passwords does not match"
    }

}