document.addEventListener("DOMContentLoaded", profilePOST)

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function profilePOST(e) {
    e.preventDefault();

    const mail = document.getElementById("email")
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
            if (data.message === "OK") {
                mail.innerHTML = data.mail
            } else {
                window.location.href = "/login"
            }
            if (data.type === "seller") {
                window.location.href = "/login"
            }
        })
}