const form = document.getElementById("newAddressForm");
form.addEventListener("submit", submitNewAddress);

function submitNewAddress(e) {
    e.preventDefault();
    const info = document.getElementById("info") 
    const token = getCookie("token")

    const title = document.getElementById("title")
    const name = document.getElementById("name")
    const surname = document.getElementById("surname")
    const phoneNumber = document.getElementById("phoneNumber")
    const province = document.getElementById("province")
    const county = document.getElementById("county")
    const detailedAddress = document.getElementById("address")

    const data = {
        token: token,
        title: title.value,
        name: name.value,
        surname: surname.value,
        phoneNumber: phoneNumber.value,
        province: province.value,
        county: county.value,
        detailedAddress: detailedAddress.value
    }

    fetch("http://127.0.0.1:3002/newUserAddress", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
        .then(data => {
            if (data.message === 'OK') {
                window.location.href = "/profile/addresses"
            } else if (data.message === "auth error") {
                info.innerHTML = "Authentication error. Please logout and login again"
            } else {
                info.innerHTML = "Server Fail. Try Again Later"
            }
        })
        .catch((err) => ("Error occured", err));
}