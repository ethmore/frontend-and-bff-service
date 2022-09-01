document.addEventListener("DOMContentLoaded", loadAddresses)

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

function loadAddresses() {
    const token = getCookie("token")

    const data = {
        token: token,
    }

    fetch("http://127.0.0.1:3002/getUserAddresses", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === 'OK') {
                listAddresses(data.addresses)
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));


    fetch("http://127.0.0.1:3007/getTotalPrice", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === 'OK') {
                totalPrice.innerHTML = data.totalPrice
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));
}

function listAddresses(addresses) {
    const addressesDiv = document.getElementById("addresses")
    for (var i = 0; i < addresses.length; i++) {
        const radio = document.createElement("input")
        radio.type = "radio"
        radio.id = addresses[i].Id
        radio.value = addresses[i].Id
        radio.name = "address"
        radio.checked = true

        const label = document.createElement("label")
        label.htmlFor = addresses[i].Id
        label.innerHTML = addresses[i].Title

        const wrapper = document.createElement("div")
        const name = document.createElement("p")
        const surname = document.createElement("p")
        const phoneNumber = document.createElement("p")
        const province = document.createElement("p")
        const county = document.createElement("p")
        const detailedAddress = document.createElement("p")

        name.innerHTML = addresses[i].Name
        surname.innerHTML = addresses[i].Surname
        phoneNumber.innerHTML = addresses[i].PhoneNumber
        province.innerHTML = addresses[i].Province
        county.innerHTML = addresses[i].County
        detailedAddress.innerHTML = addresses[i].DetailedAddress

        label.appendChild(name)
        label.appendChild(surname)
        label.appendChild(phoneNumber)
        label.appendChild(province)
        label.appendChild(county)
        label.appendChild(detailedAddress)

        wrapper.appendChild(radio)
        wrapper.appendChild(label)

        addressesDiv.appendChild(wrapper)
    }
}

const addressForm = document.getElementById("addressForm")
const form = document.getElementById("payment")
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const token = getCookie("token")

    const data2 = new FormData(addressForm);
    let addressId = "";
    for (const entry of data2) {
        addressId = `${addressId}${entry[1]}\r`;
    };

    const cardHolderName = document.getElementById("cardHolderName");
    const cardNumber = document.getElementById("cardNumber");
    const cvv = document.getElementById("cvv");
    const month = document.getElementById("month");
    const year = document.getElementById("year");
    const threeds = document.getElementById("threeds");

    const data = {
        token: token,
        addressId: addressId,
        cardHolderName: cardHolderName.value,
        cardNumber: cardNumber.value,
        cvv: cvv.value,
        month: month.value,
        year: year.value,
        threeds: threeds.checked,
    }

    if (threeds.checked === true) {
        fetch("http://127.0.0.1:3008/buy", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(data => {
                console.log(data.message)
                if (data.message === "Payment Success") {
                    document.getElementById("info").innerText = data.message
                    window.location.href = "http://127.0.0.1:3001/purchase/3ds";

                } else {
                    document.getElementById("info").innerText = data.message
                    window.location.href = "http://127.0.0.1:3001/purchase/3ds";
                }
            })
            .catch((err) => ("Error occured", err));
    } else {
        fetch("http://127.0.0.1:3008/buy", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }).then(response => response.json())
            .then(data => {
                console.log(data.message)

                if (data.message === "Payment Success") {
                    document.getElementById("info").innerText = data.message
                    window.location.href = "/payment-success";

                } else {
                    document.getElementById("info").innerText = data.message
                }
            })
            .catch((err) => ("Error occured", err));
    }
})