const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const wishlistController = require('../controller/Wishlist.controller');

// Get user's wishlist
router.get('/', authenticateToken, wishlistController.getWishlist);

// Check if a product is in the wishlist
router.get('/check/:productId', authenticateToken, wishlistController.checkWishlistItem);

// Add product to wishlist
router.post('/', authenticateToken, wishlistController.addToWishlist);

// Remove product from wishlist
router.delete('/:productId', authenticateToken, wishlistController.removeFromWishlist);

module.exports = router;
