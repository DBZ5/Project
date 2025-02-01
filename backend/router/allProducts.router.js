const express = require("express");
const { getAllProducts, postAllProducts, deleteAllProducts, updateAllProducts } = require("../controller/allProducts.controller");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", postAllProducts);
router.delete("/:id", deleteAllProducts);
router.put("/:id", updateAllProducts);

module.exports = router;
