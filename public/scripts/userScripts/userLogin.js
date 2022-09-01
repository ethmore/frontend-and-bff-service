const form = document.getElementById("userLogin");
form.addEventListener("submit", submitSellerLogin);

function submitSellerLogin(e) {
    e.preventDefault();

    const email = document.getElementById("eMail")
    const password = document.getElementById("password")

    const data = {
        email: email.value,
        password: password.value,
        type: "user"
    }

    fetch("http://127.0.0.1:3002/userLogin", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                document.cookie = "token=" + data.token + "; SameSite=None; Secure"
                window.location.href = "/profile"
            } else if (data.message === "wrong credentials"){
                info.innerHTML = "Invalid email or password"
            } else {
                info.innerHTML = "Failed. Try again later"
            }
        })
}