const express = require('express');
const app = express();
const cors = require("cors")
const path = require('path');

app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const port = 3001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/home.html'));
});

app.get('/seller-register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerRegister.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userRegister.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userLogin.html'));
});

app.get('/seller-login', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerLogin.html'));
});

app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/userProfile.html'));
});

app.get('/seller-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/sellerDashboard.html'));
});

app.get('/seller-add-product', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/views/addProduct.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});