const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./models/index');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const userRoute = require('./router/User.router');
const productRoute = require('./router/Product.router');
const { handlePayment } = require('./controller/paymentController');
const contactRoute = require('./router/contactRouter');
const bestSellingRoute = require('./router/bestSelling.router');
const allProductsRoute = require('./router/allProducts.router');
const searchRoute = require("./router/Search.router");

app.use(express.json())
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/user', userRoute)
app.use('/api/product',productRoute)
app.post("/api/payment", handlePayment)
app.use('/api/contact', contactRoute);
app.use('/api/bestSelling', bestSellingRoute);
app.use('/api/allProducts', allProductsRoute);
app.use("/api/search", searchRoute);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
