const db = require("../models");
const BestSelling = db.BestSelling;

exports.getBestSellingProducts = async (req, res) => {
  const products = await BestSelling.findAll();
  res.status(200).json(products);
};

exports.addBestSellingProduct = async (req, res) => {
  const product = await BestSelling.create(req.body);
  res.status(201).json(product);
};

exports.deleteBestSellingProduct = async (req, res) => {
  const product = await BestSelling.destroy({ where: { id: req.params.id } });
  res.status(200).json({ message: "Product deleted successfully" });
};

exports.updateBestSellingProduct = async (req, res) => {
  try {
    const product = await BestSelling.update(req.body, {
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
