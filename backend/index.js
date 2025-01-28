const express = require('express');
require("dotenv").config()
const bcrypt =require("bcrypt")
const app = express();
const port = 4000;
const db=require("./models/index")
const cors=require("cors")
const jwt =require("jsonwebtoken")


const userRoute=require("./router/User.router")
const productRoute=require("./router/Product.router")

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
