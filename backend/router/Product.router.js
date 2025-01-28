const express = require("express");
const router = express.Router();
const db = require("../models");

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await db.Products.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
