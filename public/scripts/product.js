document.addEventListener("DOMContentLoaded", getProductInfo)

function getProductInfo(e) {
    e.preventDefault();

    const token = getCookie("token")
    const link = window.location.href
    const index = link.lastIndexOf("-")
    const productId = link.slice(index + 1)

    const data = {
        token: token,
        id: productId 
    }

    fetch("http://127.0.0.1:3005/getProduct", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                console.log(data.productInfo.Products)
                createProduct(data.productInfo.Products)
            }
        })
}

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

function createProduct(product) {
    const productWrapper = document.getElementById("product")
    productWrapper.className = "flex-row"

    const image = document.createElement("img")
    image.src = ""
    image.alt = "Product Image"

    const productInfoDiv = document.createElement("div")
    productInfoDiv.className = "product-Info"

    const title = document.createElement("h3")
    title.innerHTML = product["Title"]

    const priceWrapper = document.createElement("div")
    priceWrapper.className = "priceWrapper flex-row spc-btwn"
    const price = document.createElement("p")
    price.innerHTML = product["Price"] + " TL"
    const stock = document.createElement("p")
    stock.innerHTML = "Stock: " + product["Stock"]
    priceWrapper.appendChild(price)
    priceWrapper.appendChild(stock)

    const description = document.createElement("p")
    description.innerHTML = product["Description"]

    productInfoDiv.appendChild(title)
    productInfoDiv.appendChild(priceWrapper)
    productInfoDiv.appendChild(description)

    productWrapper.appendChild(image)
    productWrapper.appendChild(productInfoDiv)

}
