const express = require("express");
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist, checkWishlistItem } = require("../controller/Wishlist.controller");
const { authenticateToken } = require("../utilities");

// Get all wishlist items
router.get("/", authenticateToken, getWishlist);

// Check if item is in wishlist
router.get("/check/:productId", authenticateToken, checkWishlistItem);

// Add to wishlist
router.post("/", authenticateToken, addToWishlist);

// Remove from wishlist
router.delete("/:productId", authenticateToken, removeFromWishlist);

module.exports = router;