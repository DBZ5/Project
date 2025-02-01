const { Favorite, Products, User } = require('../models/index');

module.exports = {
  getWishlist: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const wishlistItems = await Favorite.findAll({
        where: { userId: req.user.id },
        include: [{
          model: Products,
          as: 'product',
          attributes: ['id', 'name', 'price', 'description', 'image', 'size', 'quantity', 'category']
        }]
      });
      
      const formattedItems = wishlistItems.map(item => {
        if (!item.product) {
          return null;
        }
        return {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          description: item.product.description,
          image: item.product.image,
          size: item.product.size,
          quantity: item.product.quantity,
          category: item.product.category
        };
      }).filter(item => item !== null);

      res.json(formattedItems);
    } catch (error) {
      console.error('Error in getWishlist:', error);
      res.status(500).json({ 
        message: "Error fetching wishlist",
        error: error.message 
      });
    }
  },

  checkWishlistItem: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { productId } = req.params;
      const userId = req.user.id;
      
      const item = await Favorite.findOne({
        where: { userId, productId }
      });

      res.json({ isInWishlist: !!item });
    } catch (error) {
      console.error('Error in checkWishlistItem:', error);
      res.status(500).json({ message: "Error checking wishlist item" });
    }
  },

  addToWishlist: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { productId } = req.body;
      const userId = req.user.id;

      // Validate input data
      if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      // Convert productId to integer and validate
      const productIdInt = parseInt(productId, 10);
      if (isNaN(productIdInt)) {
        return res.status(400).json({ message: "Invalid product ID format" });
      }

      // Check if the product exists
      const product = await Products.findByPk(productIdInt);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if already in wishlist
      const existingItem = await Favorite.findOne({
        where: { userId, productId: productIdInt }
      });

      if (existingItem) {
        return res.status(200).json({ 
          message: "Item already in wishlist", 
          isInWishlist: true 
        });
      }

      // Create new wishlist item
      const wishlistItem = await Favorite.create({
        userId,
        productId: productIdInt
      });

      res.status(201).json({ 
        message: "Added to wishlist", 
        isInWishlist: true,
        item: wishlistItem
      });
    } catch (error) {
      console.error('Error in addToWishlist:', error);
      res.status(500).json({ 
        message: "Error adding to wishlist",
        error: error.message 
      });
    }
  },

  removeFromWishlist: async (req, res) => {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const { productId } = req.params;
      const userId = req.user.id;

      const deleted = await Favorite.destroy({
        where: { userId, productId }
      });

      if (deleted) {
        res.json({ message: "Removed from wishlist", isInWishlist: false });
      } else {
        res.status(404).json({ message: "Item not found in wishlist" });
      }
    } catch (error) {
      console.error('Error in removeFromWishlist:', error);
      res.status(500).json({ message: "Error removing from wishlist" });
    }
  }
};