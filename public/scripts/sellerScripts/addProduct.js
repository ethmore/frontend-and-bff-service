const form = document.getElementById("addProduct");
form.addEventListener("submit", submitSellerRegister);

function submitSellerRegister(e) {
    e.preventDefault();
    const info = document.getElementById("info") 

    const token = getCookie("token")

    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const stock = document.getElementById("stock")
    const photo = document.getElementById("photo")

    const data = {
        token: token,
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        photo: photo.value
    }
    // console.log(data)
    fetch("http://127.0.0.1:3002/addProduct", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === 'OK') {
                title.value = null
                description.value = null
                price.value = null
                stock.value = null
                photo.value = null

                info.innerHTML = "Product added succesfully!"

            } else if (data.message === "auth error") {
                info.innerHTML = "Authentication error. Please logout and login again"
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));


}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}