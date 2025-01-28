const { Wishlist, Products } = require('../models/index');

module.exports = {
  getWishlist: async (req, res) => {
    try {
      const wishlistItems = await Wishlist.findAll({
        where: { userId: req.user.userId },
        include: [{ model: Products }]
      });
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Error fetching wishlist" });
    }
  },

  addToWishlist: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.userId;

      const existingItem = await Wishlist.findOne({
        where: { userId, productId }
      });

      if (existingItem) {
        return res.status(400).json({ message: "Item already in wishlist" });
      }

      await Wishlist.create({ userId, productId });
      res.status(201).json({ message: "Added to wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Error adding to wishlist" });
    }
  },

  removeFromWishlist: async (req, res) => {
    try {
      const { productId } = req.params;
      const userId = req.user.userId;

      await Wishlist.destroy({
        where: { userId, productId }
      });

      res.json({ message: "Removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Error removing from wishlist" });
    }
  }
}; 