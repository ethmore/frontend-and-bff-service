document.addEventListener("DOMContentLoaded", getProducts)

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

function getProducts(e) {
    e.preventDefault();

    const token = getCookie("token")

    const data = {
        token: token,
    }

    fetch("http://127.0.0.1:3005/getAllProducts", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                console.log(data.products.Products)
                listProducts(data.products.Products)
            }
        })

}

function listProducts(products) {
    var length = products.length
    for (var i = 0; i < length; i++) {
        console.log(products[i])
        const productsDiv = document.getElementById("products")
        productsDiv.className = "flex-row productsDiv"

        const product = document.createElement("a")
        product.className = "flex-column product"

        const titleLink = products[i]["Title"].replace(/\s+/g, '-').toLowerCase();
        product.href = titleLink + "-p-" + products[i]["Id"]

        const image = document.createElement("img")
        const title = document.createElement("p")
        const price = document.createElement("p")

        image.className = "prod-image"
        title.className = "prod-title"
        price.className = "prod-price"

        image.alt = "IMG"
        image.src = "../image/product.webp"
        title.innerHTML = products[i]["Title"]
        price.innerHTML = products[i]["Price"] + " TL"

        product.appendChild(image)
        product.appendChild(title)
        product.appendChild(price)

        productsDiv.appendChild(product)
    }
}