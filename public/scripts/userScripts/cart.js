document.addEventListener("DOMContentLoaded", cartPOST)

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

function cartPOST(e) {
    e.preventDefault();

    const token = getCookie("token")

    const data = {
        token: token,
    }

    fetch("http://127.0.0.1:3002/profile", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "loginNeeded") {
                window.location.href = "/login"
            }
        })

    fetch("http://127.0.0.1:3007/getCartProducts", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                if (data.products.length === 0) {
                    document.getElementById("cartWrap").innerHTML = "Your cart is emtpy"
                    return
                } 
                createProductsInCart(data.products)
            }

        })
}

function createProductsInCart(products) {
    var totalPrice = 0

    for (var i = 0; i < products.length; i++) {
        const table = document.getElementById("table")
        const totalPriceElmnt = document.getElementById("totalPrice")

        const row = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("p")
        const qtyWrapper = document.createElement("div")
        const qty = document.createElement("input") 
        const  qtyDecrease = document.createElement("button")
        const qtyIncrease = document.createElement("button")
        const price = document.createElement("p")
        const del = document.createElement("a")

        row.className = "cartRow"

        image.alt = "IMG"
        title.innerHTML = products[i].Title

        qtyWrapper.className = "flex-row align-center"
        qty.type = "number"
        qty.value = products[i].Qty
        qty.max = 10
        qty.min = 1
        qty.className = "qty"
        qtyDecrease.innerHTML = "-"
        qtyIncrease.innerHTML = "+"
        qtyDecrease.className = "qtyButton"
        qtyIncrease.className = "qtyButton"

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

        qtyDecrease.id = products[i].Id
        qtyIncrease.id = products[i].Id
        qtyIncrease.addEventListener("click", function() {
            const token = getCookie("token")
            const data = {
                token: token,
                id: this.id,
            }

            fetch("http://127.0.0.1:3007/increaseProductQty", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
                .then(data => {
                    if (data.message === "OK") {
                        location.reload();
                    }
                })
        })
        qtyDecrease.addEventListener("click", function() {
            const token = getCookie("token")
            const data = {
                token: token,
                id: this.id,
            }

            fetch("http://127.0.0.1:3007/decreaseProductQty", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
                .then(data => {
                    if (data.message === "OK") {
                        location.reload();
                    }
                })
        })

        price.innerHTML = products[i].Price * qty.value + "TL"
        totalPrice = totalPrice + (products[i].Price * qty.value)
        totalPriceElmnt.innerHTML = totalPrice

                del.className = "removeProduct"
        del.id = products[i].Id
        del.addEventListener("click", function () {
            const token = getCookie("token")
            const data = {
                token: token,
                id: this.id,
            }

            fetch("http://127.0.0.1:3007/removeProductFromCart", {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            }).then(response => response.json())
                .then(data => {
                    if (data.message === "OK") {
                        location.reload();
                    }
                })
        })

        qtyWrapper.appendChild(qtyDecrease)
        qtyWrapper.appendChild(qty)
        qtyWrapper.appendChild(qtyIncrease)

        row.appendChild(image)
        row.appendChild(title)
        row.appendChild(qtyWrapper)
        row.appendChild(price)
        row.appendChild(del)


        table.appendChild(row)
    }


}

document.getElementById("toPurchase").addEventListener("click", () => {
    const token = getCookie("token")
    const total = document.getElementById("totalPrice").innerHTML
    const data = {
        token: token,
        totalPrice: total,
    }

    fetch("http://127.0.0.1:3007/toPurchase", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        if (data.message === "OK"){
            window.location.href = "/purchase"
        }
    })
})