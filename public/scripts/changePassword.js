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

const form = document.getElementById("changeUserPassword")
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const oldPass = document.getElementById("oldPassword")
    const newPass = document.getElementById("newPassword")
    const newPassAgain = document.getElementById("newPasswordAgain")
    const info = document.getElementById("info")

    if (newPass.value !== newPassAgain.value) {
        info.innerHTML = "Passwords does not match"
        return
    }
    const token = getCookie("token")

    const data = {
        token: token,
        oldPassword: oldPass.value,
        newPassword: newPass.value,
        newPasswordAgain: newPassAgain.value
    }

    fetch("http://127.0.0.1:3002/changeUserPassword", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        if (data.message === "wrong old password"){
            info.innerHTML = "Wrong old password"
        } else if (data.message === "passwords does not match") {
            info.innerHTML = "Passwords does not match"
        } else if (data.message === "OK") {
            info.innerHTML = "Password changed succesfully"
        }

    })
})