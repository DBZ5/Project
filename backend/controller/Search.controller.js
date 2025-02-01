const { Products, AllProducts, BestSelling } = require("../models");
const { Op } = require("sequelize");

const searchProducts = async (req, res) => {
  const { q } = req.query;

  try {
    const products = await Products.findAll({
      where: { name: { [Op.like]: `%${q}%` } }
    });
    const allProducts = await AllProducts.findAll({
      where: { name: { [Op.like]: `%${q}%` } }
    });
    const bestSelling = await BestSelling.findAll({
      where: { name: { [Op.like]: `%${q}%` } }
    });

    const results = [
      ...products.map(p => ({ ...p.toJSON(), type: "Product" })),
      ...allProducts.map(p => ({ ...p.toJSON(), type: "AllProduct" })),
      ...bestSelling.map(p => ({ ...p.toJSON(), type: "BestSelling" }))
    ];

    res.json(results);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Error performing search" });
  }
};

module.exports = { searchProducts }; 