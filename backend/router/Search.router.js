const express = require("express");
const router = express.Router();
const { searchProducts } = require("../controller/Search.controller");

router.get("/", searchProducts);

module.exports = router; 