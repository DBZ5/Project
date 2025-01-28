import React, { useState } from "react";
import Navbar from "./Navbar";

const MainPage = () => {
  const categories = [
    "Women's Fashion",
    "Men's Fashion",
    "Electronics",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Outdoors",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://i.postimg.cc/pdCcb9Xk/image.png",
    "https://i.postimg.cc/NffQXXZ7/image.png",
    "https://i.postimg.cc/pdCcb9Xk/image.png",
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
                <p className="sidebar-category" key={index}>
                  {category}
                </p>
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
      </main>
    </>
  );
};

export default MainPage;
