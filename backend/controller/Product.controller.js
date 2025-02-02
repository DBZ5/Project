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
  try {
    const products = await Product.findAll({
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['fullName', 'email']
        }
      ]
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: db.User,
          as: 'user',
          attributes: ['fullName', 'email']
        }
      ]
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update product" });
  }
};
