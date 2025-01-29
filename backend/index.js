const express = require('express');
require("dotenv").config()
const bcrypt =require("bcrypt")
const app = express();
const port = 3000;
const db=require("./models/index")
const cors=require("cors")
const jwt =require("jsonwebtoken")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const userRoute=require("./router/User.router")
const productRoute=require("./router/Product.router")
const { handlePayment } = require("./controller/paymentController")

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.post("/api/payment", handlePayment)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
