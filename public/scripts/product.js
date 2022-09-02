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
                // console.log(data.productInfo.Products)
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
    image.src = "../image/product.webp"

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

    const descriptionWrapper = document.createElement("div")
    const descriptionTitle = document.createElement("h4")
    descriptionTitle.innerHTML = "Description:"

    const description = document.createElement("p")
    description.innerHTML = product["Description"]

    descriptionWrapper.appendChild(descriptionTitle)
    descriptionWrapper.appendChild(description)

    const qty = document.createElement("input")
    qty.type = "number"
    qty.value = 1
    qty.className = "qty"
    qty.max = 10
    qty.min = 1

    var invalidChars = [
        "-",
        "+",
        "e",
    ];

    qty.addEventListener("keydown", function (e) {
        if (invalidChars.includes(e.key)) {
            e.preventDefault();
        }
    })

    const addCartBtn = document.createElement("a")
    addCartBtn.className = "addCartBtn"
    addCartBtn.innerHTML = "Add To Cart"
    addCartBtn.addEventListener("click", function (e) {
        e.preventDefault();
        const token = getCookie("token")
        const data = {
            token: token,
            id: product["Id"],
            qty: qty.value
        }
        fetch("http://127.0.0.1:3007/addProductToCart", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                if (data.message === "OK") {
                    window.location.href = "/cart"
                }
            })
    })

    productInfoDiv.appendChild(title)
    productInfoDiv.appendChild(priceWrapper)
    productInfoDiv.appendChild(descriptionWrapper)
    productInfoDiv.appendChild(qty)
    productInfoDiv.appendChild(addCartBtn)


    productWrapper.appendChild(image)
    productWrapper.appendChild(productInfoDiv)

}
