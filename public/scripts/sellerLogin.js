const form = document.getElementById("sellerLogin");
form.addEventListener("submit", submitSellerLogin);

function submitSellerLogin(e) {
    e.preventDefault();
    const info = document.getElementById("info") 

    const formEmail = document.getElementById("eMail")
    const password = document.getElementById("password")

    const data = {
        email: formEmail.value,
        password: password.value,
        type: "seller"
    }
    console.log(data)

    fetch("http://127.0.0.1:3002/sellerLogin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
    .then(data => {
        if (data.message === "OK") {
            info.innerHTML = "Logged in succesfully. Redirecting to dashboard..."

            document.cookie = "token=" + data.token + "; SameSite=None; Secure"
            window.location.href = "/seller-dashboard"
        } else if (data.message === "wrong credentials"){
            info.innerHTML = "Invalid email or password"
        } else {
            info.innerHTML = "Failed. Try again later"
        }
    })
}