const express = require('express');
const router = express.Router();
const wishlistController = require('../controller/Wishlist.controller');

// Ensure the controller methods are correctly defined
if (!wishlistController.getWishlist || !wishlistController.addToWishlist || !wishlistController.removeFromWishlist) {
  throw new Error('Wishlist controller methods are not properly defined');
}

// Get wishlist
router.get('/', wishlistController.getWishlist);

// Add product to wishlist
router.post('/', wishlistController.addToWishlist);

// Remove product from wishlist
router.delete('/:productId', wishlistController.removeFromWishlist);

module.exports = router;;
