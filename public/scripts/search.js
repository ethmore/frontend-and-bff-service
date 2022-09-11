document.addEventListener("DOMContentLoaded", () => {
    currentUrl = location.href
    searchKeys = currentUrl.split("/sr/")[1]


    data = {
        searchQuery: searchKeys
    }
    console.log(data)

    fetch("http://127.0.0.1:3006/search", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            console.log(data)

            listProducts(data.products)
        })
})

function listProducts(products) {
    var length = products.length
    for (var i = 0; i < length; i++) {
        console.log(products[i])
        const productsDiv = document.getElementById("products")
        productsDiv.className = "flex-row productsDiv"

        const product = document.createElement("a")
        product.className = "flex-column product"

        const titleLink = products[i]["Title"].replace(/\s+/g, '-').toLowerCase();
        link = location.href.split("/sr/")
        product.href = link[0] + "/" + titleLink + "-p-" + products[i]["ID"]

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