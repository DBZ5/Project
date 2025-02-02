const db = require("../models");
const Product = db.Products;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.createProduct = [
    upload.single('image'), 
    async (req, res) => {
        try {
            const productData = {
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                image: req.file.path, 
            };
            const product = await Product.create(productData);
            
            // Notify admin (this could be a database entry or an event)
            console.log(`New product added: ${product.name} by seller ID: ${req.user.id}`);

            res.status(201).json(product);
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: "Error creating product" });
        }
    }
];

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.destroy({ where: { id } });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(204).send(); 
    } catch (error) {
        return res.status(500).json({ message: "Error deleting product" });
    }
};



