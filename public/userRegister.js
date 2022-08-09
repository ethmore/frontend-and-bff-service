const form = document.getElementById("userRegisterForm");
form.addEventListener("submit", submitSellerRegister);

function submitSellerRegister(e) {
    e.preventDefault();
    const name = document.getElementById("name").value
    const surname = document.getElementById("surname").value
    const email = document.getElementById("eMail").value
    const password = document.getElementById("password").value
    const passwordAgain = document.getElementById("passwordAgain").value

    const data = {
        name,
        surname,
        email,
        password,
        passwordAgain,
    }

    fetch("http://127.0.0.1:3002/userRegister", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
    .then(data => {
        console.log('asd')
            
        if (data.message === "OK-Success") { //Message will be changed
            name = null
            email = null
            password = null
            passwordAgain = null

        } else {
            name = null
        }
    })
    .catch((err) => ("Error occured", err));
}


// .then((response) => {
//     console.log(response)
    
//     if (response.ok) { //Message will be changed
//         name = null
//         surname = null
//         email = null
//         password = null
//         passwordAgain = null
//     } else {
//         name = null
//     }

//     // return response.statusText

// } )
// .then(data => {
//     // console.log(data)

    
// })
// .catch((err) => ("Error occured", err));