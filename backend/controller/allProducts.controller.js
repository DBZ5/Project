const db = require("../models");
const AllProducts = db.AllProducts;

const getAllProducts = async (req, res) => {
  const allProducts = await AllProducts.findAll();
  res.json(allProducts);
};

const postAllProducts = async (req, res) => {
  const { name, price, description, image, category } = req.body;
  const allProducts = await AllProducts.create({ name, price, description, image, category });
  res.json(allProducts);
};

const deleteAllProducts = async (req, res) => {
  const { id } = req.params;
  const allProducts = await AllProducts.destroy({ where: { id } });
  res.json(allProducts);
};

const updateAllProducts = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image, category } = req.body;
  const allProducts = await AllProducts.update({ name, price, description, image, category }, { where: { id } });
  res.json(allProducts);
};

module.exports = { getAllProducts, postAllProducts, deleteAllProducts, updateAllProducts };
