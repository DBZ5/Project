import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const MainPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      axios.get("http://localhost:5173/api/product")
        .then(response => {
          setProducts(Array.isArray(response.data) ? response.data : []);
        })
        .catch(error => {
          console.error("Error fetching products:", error);
        });
    };
    fetchProducts();
  }, []);

  const categories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Outdoors",
  ];

  return (
    <>
      <Navbar />
      <main>
        <div className="hero">
          <div className="sidebar">
            <h3>Categories</h3>
            <ul>
              {categories.map((category, index) => (
                <p className="sidebar-category" key={index}>{category}</p>
              ))}
            </ul>
          </div>
          <div className="products">
            {products.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id}>
                <div className="product-item">
                  <h4>{product.name}</h4>
                  <p>${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;
