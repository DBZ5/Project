const express = require('express');
const app = express();
const port = 3000;
const db=require("./models/index")
const cors=require("cors")
const userRoute=require("./router/User.router")
const productRoute=require("./router/Product.router")




app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
