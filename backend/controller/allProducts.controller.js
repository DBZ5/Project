const db = require("../models");
const AllProducts = db.AllProducts;

const getAllProducts = async (req, res) => {
  const allProducts = await AllProducts.findAll();
  res.json(allProducts);
};

const postAllProducts = async (req, res) => {
  const { name, price, description, image } = req.body;
  const allProducts = await AllProducts.create({ name, price, description, image });
  res.json(allProducts);
};

const deleteAllProducts = async (req, res) => {
  const { id } = req.params;
  const allProducts = await AllProducts.destroy({ where: { id } });
  res.json(allProducts);
};

const updateAllProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;
  const allProducts = await AllProducts.update({ name, price, description, image }, { where: { id } });
  res.json(allProducts);
};

module.exports = { getAllProducts, postAllProducts, deleteAllProducts, updateAllProducts };
