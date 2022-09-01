document.addEventListener("DOMContentLoaded", fillProductInfo)

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function fillProductInfo(e) {
    e.preventDefault();

    const token = getCookie("token")
    const link = window.location.href
    const index = link.lastIndexOf("-")
    const productId = link.slice(index + 1)

    const data = {
        token: token,
        id: productId
    }

    fetch("http://127.0.0.1:3002/profile", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message !== "OK") {
                window.location.href = "/seller-login"
            }
        })

    fetch("http://127.0.0.1:3005/getProduct", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                document.getElementById("title").value = data.productInfo.Products["Title"]
                document.getElementById("description").value = data.productInfo.Products["Description"]
                document.getElementById("price").value = data.productInfo.Products["Price"]
                document.getElementById("stock").value = data.productInfo.Products["Stock"]
            }
        })
}

const form = document.getElementById("editProduct");
form.addEventListener("submit", submitEditProduct);

function submitEditProduct(e) {
    e.preventDefault();

    const link = window.location.href
    const index = link.lastIndexOf("-")
    const productId = link.slice(index + 1)

    const token = getCookie("token")
    const title = document.getElementById("title")
    const description = document.getElementById("description")
    const price = document.getElementById("price")
    const stock = document.getElementById("stock")
    const photo = document.getElementById("photo")


    const data = {
        token: token,
        id: productId,
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        photo: photo.value
    }
    console.log(data)

    fetch("http://127.0.0.1:3002/editProduct", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === 'OK') {

                info.innerHTML = "Product edit success!"

            } else if (data.message === "auth error") {
                info.innerHTML = "Authentication error. Please logout and login again"
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));

}

const delButton = document.getElementById("delBtn")
delButton.addEventListener("click", deleteProduct)
var delButtonCounter = 0

function deleteProduct(e) {
    e.preventDefault();
    if (delButtonCounter < 1) {
        delButtonCounter++
        info.innerHTML = "Click 'Delete Product' button again to delete product"
        return
    }

    const token = getCookie("token")
    const link = window.location.href
    const index = link.lastIndexOf("-")
    const productId = link.slice(index + 1)

    const data = {
        token: token,
        id: productId
    }

    fetch("http://127.0.0.1:3002/deleteProduct", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                window.location.href = "/seller-dashboard"
            }
            if (data.message === "loginNeeded") {
                window.location.href = "/seller-login"
            }
        })

    delButtonCounter = 0
}