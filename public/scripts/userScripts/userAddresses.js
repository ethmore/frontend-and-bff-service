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
            } else if (data.message === "auth error") {
                info.innerHTML = "Authentication error. Please logout and login again"
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));

}

function listAddresses(addresses) {
    const addressesDiv = document.getElementById("addresses")
    for (var i = 0; i < addresses.length; i++) {
        console.log(addresses[i].Title)

        const wrapper = document.createElement("a")
        const title = document.createElement("p")
        const name = document.createElement("p")
        const surname = document.createElement("p")
        const phoneNumber = document.createElement("p")
        const province = document.createElement("p")
        const county = document.createElement("p")
        const detailedAddress = document.createElement("p")

        title.innerHTML = addresses[i].Title
        name.innerHTML = addresses[i].Name
        surname.innerHTML = addresses[i].Surname
        phoneNumber.innerHTML = addresses[i].PhoneNumber
        province.innerHTML = addresses[i].Province
        county.innerHTML = addresses[i].County
        detailedAddress.innerHTML = addresses[i].DetailedAddress

        wrapper.appendChild(title)
        wrapper.appendChild(name)
        wrapper.appendChild(surname)
        wrapper.appendChild(phoneNumber)
        wrapper.appendChild(province)
        wrapper.appendChild(county)
        wrapper.appendChild(detailedAddress)

        addressesDiv.appendChild(wrapper)
    }

}