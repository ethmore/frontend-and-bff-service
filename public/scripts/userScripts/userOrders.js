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

document.addEventListener("DOMContentLoaded", loadOrders)
function loadOrders() {
    const token = getCookie("token")

    const data = {
        token: token,
    }

    fetch("http://127.0.0.1:3002/getAllOrders", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === "OK") {
                listOrders(data.orders)
            }
        })
}

async function listOrders(orders) {
    console.log(orders)
    if (orders === null) {
        return
    }

    for (var i = 0; i < orders.length; i++) {
        const table = document.getElementById("ordersTable")
        const parentRow = document.createElement("div")
        parentRow.className = "parentRow"

        const row = document.createElement("div")
        row.className = "order-row flex-row spc-btwn margin-auto"

        const id_time = document.createElement("div")
        const total_status = document.createElement("div")
        const orderID = document.createElement("p")
        const orderTime = document.createElement("p")
        const totalPrice = document.createElement("p")
        const orderStatus = document.createElement("p")

        orderID.className = "orderID"
        orderID.id = orders[i].ID
        orderTime.className = "orderTime"
        totalPrice.className = "totalPrice"
        orderStatus.className = "orderStatus"

        orderID.innerText = "Order ID: " + orders[i].ID
        orderTime.innerText = orders[i].OrderTime
        totalPrice.innerText = orders[i].TotalPrice + " TL"
        orderStatus.innerText = orders[i].OrderStatus

        id_time.appendChild(orderID)
        id_time.appendChild(orderTime)
        total_status.appendChild(totalPrice)
        total_status.appendChild(orderStatus)

        row.appendChild(id_time)
        row.appendChild(total_status)
        parentRow.appendChild(row)


        for (var j = 0; j < orders[i].Products.length; j++) {
            const productRow = document.createElement("div")
            productRow.className = "productRow flex-row spc-btwn margin-auto"

            const title_seller = document.createElement("div")
            const title = document.createElement("span")
            const qty = document.createElement("span")
            const totalPrice = document.createElement("span")
            const sellerName = document.createElement("span")

            title_seller.className = "flex-column"
            title.className = "title"
            qty.className = "qty"
            totalPrice.className = "totalPrice"
            sellerName.className = "sellerName"

            title.innerText = orders[i].Products[j].Title
            qty.innerText = "Qty: " + orders[i].Products[j].Qty
            totalPrice.innerText = "Total: " + orders[i].Products[j].Price + " TL"
            sellerName.innerText = "Seller: " + orders[i].Products[j].SellerName

            title_seller.appendChild(title)
            title_seller.appendChild(sellerName)

            productRow.appendChild(title_seller)
            productRow.appendChild(qty)
            productRow.appendChild(totalPrice)
            parentRow.appendChild(productRow)
        }

        const address_payment = document.createElement("div")
        address_payment.className = "flex-row spc-btwn width80 margin-auto align-center"

        const token = getCookie("token")
        const data = {
            token: token,
            addressId: orders[i].ShipmentAddressID
        }
        await fetch("http://127.0.0.1:3002/getUserAddressById", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.message === "OK") {
                    const address = loadAddress(data.address)
                    address_payment.appendChild(address)
                }
            })

        const payment = document.createElement("div")
        const cardNumber = document.createElement("span")
        const paymentStatus = document.createElement("span")

        payment.className = "flex-column"

        cardNumber.innerText = "**** **** **** " + orders[i].CardLastFourDigits
        paymentStatus.innerText = "Payment Status: " + orders[i].PaymentStatus

        payment.appendChild(cardNumber)
        payment.appendChild(paymentStatus)

        address_payment.appendChild(payment)
        parentRow.appendChild(address_payment)
        table.appendChild(parentRow)
    }

}

function loadAddress(address) {
    const wrapper = document.createElement("a")
    const title = document.createElement("span")
    const name_surname = document.createElement("span")
    const phoneNumber = document.createElement("span")
    const province_county = document.createElement("span")
    const detailedAddress = document.createElement("span")

    title.innerHTML = address.Title
    name_surname.innerHTML = address.Name + " " + address.Surname
    phoneNumber.innerHTML = address.PhoneNumber
    province_county.innerHTML = address.Province + " / " + address.County
    detailedAddress.innerHTML = address.DetailedAddress

    wrapper.className = "flex-column"

    wrapper.appendChild(title)
    wrapper.appendChild(name_surname)
    wrapper.appendChild(phoneNumber)
    wrapper.appendChild(province_county)
    wrapper.appendChild(detailedAddress)

    return wrapper
}
