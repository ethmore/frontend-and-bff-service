document.addEventListener("DOMContentLoaded", init)

function init(e) {
    e.preventDefault();
    validateToken();

}

function loadNavbar(tokenMail, loginType) {
    const navBar = document.getElementById("navBar")

    const blanket = document.createElement("div")
    blanket.className = "blanket"

    const logo = document.createElement("a")
    logo.className = "logo"
    logo.innerHTML = "eComm"
    logo.href = "/"

    const searchBar = document.createElement("input")
    searchBar.className = "search-bar"
    searchBar.type = "text"
    searchBar.name = "searchBar"
    searchBar.id = "searchBar"
    searchBar.placeholder = "Search Product"

    const form = document.createElement("form")
    form.appendChild(searchBar)

    const userDiv = document.createElement("div")
    userDiv.className = "register"

    if (loginType === "seller") {
        if (tokenMail !== undefined) {
            const dropdwn = sellerDropdown(tokenMail);
            userDiv.appendChild(dropdwn)
        } else {
            eraseCookie("token")
            window.location = "/seller-login"
        }
    } else if (loginType === "user") {
        if (tokenMail !== undefined) {
            const dropdown = userDropdown(tokenMail);

            const cart = document.createElement("a")
            cart.id = "cart"
            cart.href = "/cart"

            userDiv.appendChild(dropdown);
            userDiv.appendChild(cart);
        } else {
            eraseCookie("token")
            window.location = "/login"
        }
    } else {
        const wrapper = loadUserSellerLoginRegister();
        userDiv.appendChild(wrapper)
    }

    navBar.appendChild(blanket)
    navBar.appendChild(logo)
    navBar.appendChild(form)
    navBar.appendChild(userDiv)
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

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Max-Age=-99999999;';
}

function validateToken() {
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
            loadNavbar(data.mail, data.type);
        })
}

function loadUserSellerLoginRegister() {
    const sellerRegister = document.createElement("a")
    sellerRegister.href = "/seller-register"
    sellerRegister.innerHTML = "Seller Register"

    const sellerLogin = document.createElement("a")
    sellerLogin.href = "/seller-login"
    sellerLogin.innerHTML = "Seller Login"

    const sellerDiv = document.createElement("div")
    sellerDiv.className = "flex-column"
    sellerDiv.appendChild(sellerRegister)
    sellerDiv.appendChild(sellerLogin)

    const userRegister = document.createElement("a")
    userRegister.href = "/register"
    userRegister.innerHTML = "User Register"

    const userLogin = document.createElement("a")
    userLogin.href = "/login"
    userLogin.innerHTML = "User Login"

    const userLogDiv = document.createElement("div")
    userLogDiv.className = "flex-column"
    userLogDiv.appendChild(userRegister)
    userLogDiv.appendChild(userLogin)

    const wrapper = document.createElement("div")
    wrapper.appendChild(sellerDiv)
    wrapper.appendChild(userLogDiv)
    wrapper.className = "register"

    return wrapper
}

function sellerDropdown(tokenMail) {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const button = document.createElement("a")
    button.className = "dropbtn"
    button.innerHTML = "Seller Dashboard"
    button.href = "/seller-dashboard"

    const content = document.createElement("div")
    content.className = "dropdown-content"

    const sellerMail = document.createElement("p")
    sellerMail.id = "email"
    sellerMail.innerHTML = tokenMail

    const addProductBtn = document.createElement("a")
    addProductBtn.innerHTML = "Add Product"
    addProductBtn.href = "/seller-add-product"

    const logoutBtn = document.createElement("a")
    logoutBtn.className = "logout-btn"
    logoutBtn.innerHTML = "Logout"
    logoutBtn.href = ""
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        eraseCookie("token")
        window.location = "/"
    })

    content.appendChild(sellerMail);
    content.appendChild(addProductBtn);
    content.appendChild(logoutBtn);

    dropdown.appendChild(button)
    dropdown.appendChild(content)

    return dropdown
}

function userDropdown(tokenMail) {
    const dropdown = document.createElement("div");
    dropdown.className = "dropdown";

    const button = document.createElement("a")
    button.className = "dropbtn"
    button.innerHTML = "Account"
    button.href = "/profile"

    const content = document.createElement("div")
    content.className = "dropdown-content"

    const userMail = document.createElement("p")
    userMail.id = "email"
    userMail.innerHTML = tokenMail

    const myAddressses = document.createElement("a")
    myAddressses.innerHTML = "My addresses"
    myAddressses.href = "/profile/addresses"

    const accountSettings = document.createElement("a")
    accountSettings.innerHTML = "Account Settings"
    accountSettings.href = "/profile/settings"

    const logoutBtn = document.createElement("a")
    logoutBtn.className = "logout-btn"
    logoutBtn.innerHTML = "Logout"
    logoutBtn.href = ""
    logoutBtn.addEventListener("click", function (e) {
        e.preventDefault();
        eraseCookie("token")
        window.location = "/"
    })

    content.appendChild(userMail);
    content.appendChild(myAddressses);
    content.appendChild(accountSettings)
    content.appendChild(logoutBtn);

    dropdown.appendChild(button)
    dropdown.appendChild(content)

    return dropdown
}