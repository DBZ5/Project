const express = require("express");
const router = express.Router();
const bestSellingController = require("../controller/bestSelling.controller");

router.post("/", bestSellingController.addBestSellingProduct);
router.get("/", bestSellingController.getBestSellingProducts);
router.delete("/:id", bestSellingController.deleteBestSellingProduct);
router.put("/:id", bestSellingController.updateBestSellingProduct);

module.exports = router;
