const db = require("../models");
const Product = db.Products;

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll();
  res.status(200).json(products);
};



exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.update(req.body, { where: { id: req.params.id } });
      res.status(200).json(product);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

