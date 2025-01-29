import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";

const MainPage = () => {
  const categories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Outdoors",
  ];

  const [data, setData] = useState([]);

  console.log(data);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://i.postimg.cc/pdCcb9Xk/image.png",
    "https://i.postimg.cc/NffQXXZ7/image.png",
    "https://i.postimg.cc/pdCcb9Xk/image.png",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }


  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="hero">
          <div className="sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul>
              {categories.map((category, index) => (
                <li className="sidebar-category" key={index}>
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-ad">
            <img
              className="ad-image"
              src={images[currentImageIndex]}
              alt="hero-ad"
              style={{ transition: "opacity 0.5s ease-in-out" }}
            />
            <div className="carousel-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    currentImageIndex === index ? "active" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="products">
          <h3 className="products-title">Products</h3>
          <div className="products-container">
            <div className="product">
              {data.map((product) => {
                return (
                  <div className="product-card" key={product.id}>
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">{product.price}</p>
                    
                
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainPage;