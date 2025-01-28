const express = require("express");
const router = express.Router();
const { getWishlist, addToWishlist, removeFromWishlist } = require("../controller/Wishlist.controller");
const { authenticateToken } = require("../utilities");

router.get("/", authenticateToken, getWishlist);
router.post("/:productId", authenticateToken, addToWishlist);
router.delete("/:productId", authenticateToken, removeFromWishlist);

module.exports = router; 