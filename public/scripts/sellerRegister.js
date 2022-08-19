const form = document.getElementById("sellerRegisterForm");
form.addEventListener("submit", submitSellerRegister);

function submitSellerRegister(e) {
    e.preventDefault();
    const info = document.getElementById("info") 
    
    const companyName = document.getElementById("companyName")
    const email = document.getElementById("eMail")
    const password = document.getElementById("password")
    const passwordAgain = document.getElementById("passwordAgain")
    const address = document.getElementById("address")
    const phoneNumber = document.getElementById("phoneNumber")

    if (password.value === passwordAgain.value) {
        const data = {
            companyName: companyName.value,
            email: email.value,
            password: password.value,
            passwordAgain: passwordAgain.value,
            address: address.value,
            phoneNumber: phoneNumber.value
        }

        fetch("http://127.0.0.1:3002/sellerRegister", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(data => {
                if (data.message === "OK") {
                    companyName.value = null
                    email.value = null
                    password.value = null
                    passwordAgain.value = null
                    address.value = null
                    phoneNumber.value = null

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
