const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');
const fetch = require('node-fetch')

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const port = 3001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/home.html'));
});

//User
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userRegister.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userLogin.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userProfile.html'));
});

app.get('/profile/addresses', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userAddresses.html'));
});

app.get('/profile/add-new-address', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userNewAddress.html'));
});

app.get('/cart', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/userCart.html'));
});

app.get('/purchase', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/purchase.html'));
});

app.get('/payment-success', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/paymentSuccess.html'));
});

app.get('/payment-failed', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userViews/paymentFail.html'));
});

var str = ""

app.get('/purchase/3ds', (req, res) => {
    res.send(str)
});

app.post('/purchase/3ds', (req, res) => {
    str = req.body.content
    res.json({"message": "OK"})
});

app.post('/payment-callback', async (req, res) => {
    console.log(req.body)
    if (req.body.status === "success") {
        const data = {
            status: req.body.status,
            paymentId: req.body.paymentId,
            conversationData: req.body.conversationData,
            conversationId: req.body.conversationId,
            mdStatus:req.body.mdStatus
        }
        const threedsResult = await fetch("http://127.0.0.1:3008/makeThreeDsPayment", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })
        const threedsResultData = await threedsResult.json();
        console.log(threedsResultData)
        if (threedsResultData.message === "success") {
            res.sendFile(path.join(__dirname + '/public/views/userViews/paymentSuccess.html'));
        } else {
            res.sendFile(path.join(__dirname + '/public/views/userViews/paymentFail.html'));

        }
    } else {
        str = ""
        res.sendFile(path.join(__dirname + '/public/views/userViews/paymentFail.html'));
    }
});

//Seller
app.get('/seller-register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerViews/sellerRegister.html'));
});

app.get('/seller-login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerViews/sellerLogin.html'));
});

app.get('/seller-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerViews/sellerDashboard.html'));
});

app.get('/seller-add-product', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerViews/addProduct.html'));
});

app.get('/product-edit/:product', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerViews/productEdit.html'));
});

//Public
app.get('/:product', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/product.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});