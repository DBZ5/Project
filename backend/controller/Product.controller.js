const db = require("../models");
const Product = db.Products;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate image - ensure it's a string URL
    let imageUrl = '';
    if (Array.isArray(images) && images.length > 0) {
      // Take the first image if multiple are provided
      imageUrl = images[0];
    } else if (typeof images === 'string') {
      imageUrl = images;
    } else {
      return res.status(400).json({ message: 'Invalid image format' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image: imageUrl // Store as string
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

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

exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const image = req.file.path; // Assuming you're using multer for file uploads

    const newProduct = await Product.create({
      name,
      price,
      description,
      image,
      category
    });

    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product', error: error.message });
  }
};
