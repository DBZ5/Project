const express = require('express');
require('dotenv').config();
const bcrypt = require('bcrypt');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./models/index');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const productRoute=require("./router/Product.router")
const wishlistRoute = require("./router/Wishlist.router");
const userRoute = require('./router/User.router');
const { handlePayment } = require('./controller/paymentController');
const contactRoute = require('./router/contactRouter');

app.use(express.json())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/wishlist', wishlistRoute);
app.post("/api/payment", handlePayment)
app.use('/api/contact', contactRoute);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
