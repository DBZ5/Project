const { Products } = require('../models');

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;
        const newProduct = await Products.create({
            name,
            price,
            description,
            image,
            category,
            sellerId: req.user.id // Assuming you have sellerId in the request
        });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error creating product' });
    }
};

// Fetch all products created by the seller
const getSellerProducts = async (req, res) => {
    try {
        const products = await Products.findAll({
            where: { sellerId: req.user.id } // Assuming you have sellerId in the request
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching seller products:', error);
        res.status(500).json({ message: 'Error fetching products' });
    }
};

module.exports = {
    createProduct,
    getSellerProducts
};
