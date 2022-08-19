const form = document.getElementById("sellerLogin");
form.addEventListener("submit", submitSellerLogin);

function submitSellerLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email")
    const password = document.getElementById("password")

    const data = {
        email: email.value,
        password: password.value
    }

    fetch("http://127.0.0.1:3002/sellerLogin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
    .then(data => {
        if (data.message === "OK") {
            document.cookie = "token=" + data.token + "; SameSite=None; Secure"
            window.location.href = "/seller-dashboard"
        }
    })
}