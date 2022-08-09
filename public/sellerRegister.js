const form = document.getElementById("sellerRegisterForm");
form.addEventListener("submit", submitSellerRegister);

function submitSellerRegister(e) {
    e.preventDefault();
    const companyName = document.getElementById("companyName").value
    const email = document.getElementById("eMail").value
    const password = document.getElementById("password").value
    const passwordAgain = document.getElementById("passwordAgain").value
    const address = document.getElementById("address").value
    const phoneNumber = document.getElementById("phoneNumber").value

    const data = {
        companyName,
        email,
        password,
        passwordAgain,
        address,
        phoneNumber
    }

    fetch("http://127.0.0.1:3002/sellerRegister", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
    .then(data => {
        if (data.message === "") { //Message will be changed
            companyName = null
            email = null
            password = null
            passwordAgain = null
            address = null
            phoneNumber = null

        } else {
        }
    })
    .catch((err) => ("Error occured", err));
}
