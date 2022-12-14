const mail = document.getElementById("email")
document.addEventListener("DOMContentLoaded", profilePOST)

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

function profilePOST(e) {
    e.preventDefault();

    const token = getCookie("token")

    const data = {
        token: token,
    }

    fetch("http://127.0.0.1:3002/getProducts", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                listProducts(data.products)
            } else {
                window.location.href = "/seller-login"
            }
        })
}

function listProducts(products) {
    if (products === null) {
        return
    }
    var length = products.length
    for (var i = 0; i < length; i++) {
        const productsTable = document.getElementById("productsTable")

        const row = document.createElement("div")
        row.className = "flex-row productsTable-row"

        const image = document.createElement("img")
        const title = document.createElement("p")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const stock = document.createElement("p")
        const edit = document.createElement("a")

        image.className = "image-col"
        title.className = "title-col"
        price.className = "price-col"
        description.className = "description-col"
        stock.className = "stock-col"
        edit.className = "edit-col"
        edit.id = products[i]["Id"]

        var linkFirstSection = products[i]["Title"].replace(/\s+/g, '-').toLowerCase();
        edit.href = "product-edit/" + linkFirstSection + "-" + products[i]["Id"]

        image.alt = "IMG"
        title.innerHTML = products[i]["Title"]
        price.innerHTML = products[i]["Price"]
        description.innerHTML = products[i]["Description"]
        stock.innerHTML = products[i]["Stock"]

        row.appendChild(image)
        row.appendChild(title)
        row.appendChild(price)
        row.appendChild(description)
        row.appendChild(stock)
        row.appendChild(edit)

        productsTable.appendChild(row)
    }
}
