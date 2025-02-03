const express = require('express');
const router = express.Router();
const { createProduct, getSellerProducts } = require('../controller/SellerProduct.controller');
const { authenticateToken } = require('../utilities'); // Middleware to authenticate user

// Create a new product
router.post('/products', authenticateToken, createProduct);

// Get all products for the seller
router.get('/products', authenticateToken, getSellerProducts);

module.exports = router;
