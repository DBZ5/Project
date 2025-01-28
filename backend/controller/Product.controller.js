const dummyProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    description: "High-quality wireless headphones with noise cancellation",
    image: "https://picsum.photos/200/300",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Men's Casual Shirt",
    price: 45.99,
    description: "Comfortable cotton casual shirt for men",
    image: "https://picsum.photos/200/300",
    category: "Men's Fashion"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    description: "Feature-rich smartwatch with health tracking",
    image: "https://picsum.photos/200/300",
    category: "Electronics"
  }
];

const getAllProducts = (req, res) => {
  try {
    res.json(dummyProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = (req, res) => {
  try {
    const product = dummyProducts.find(p => p.id === parseInt(req.params.id));
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
