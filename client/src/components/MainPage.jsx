import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import CountdownTimer from "./Counter";
import CountUp from "react-countup";

const MainPage = () => {
  const categories = [
    {
      name: "Women's Fashion",
      id: 1,
      image:
        "https://api.iconify.design/icon-park-twotone:full-dress-longuette.svg",
    },
    {
      name: "Men's Fashion",
      id: 2,
      image: "https://api.iconify.design/fluent:clothes-hanger-16-filled.svg",
    },
    {
      name: "Electronics",
      id: 3,
      image: "https://api.iconify.design/line-md:cellphone-twotone.svg",
    },
    {
      name: "Home & Kitchen",
      id: 4,
      image:
        "https://api.iconify.design/streamline:food-kitchenware-fork-spoon-fork-spoon-food-dine-cook-utensils-eat-restaurant-dining.svg",
    },
    {
      name: "Beauty & Health",
      id: 5,
      image: "https://api.iconify.design/material-symbols:gfit-health.svg",
    },
    {
      name: "Sports & Outdoors",
      id: 6,
      image:
        "https://api.iconify.design/material-symbols-light:sports-basketball.svg",
    },
  ];

  const [data, setData] = useState([]);

  console.log(data);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "https://i.postimg.cc/wBKJYLWd/image.png",
    "https://i.postimg.cc/K8LVbXPp/Frame-1.png",
    "https://i.postimg.cc/BQD9S1sC/Frame-2.png",
  ];

  const [isCountdownOver, setIsCountdownOver] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navbar />
      <main>
        <div className="hero">
          <div className="sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul>
              {categories.map((category) => (
                <li className="sidebar-category" key={category.id}>
                  <img
                    className="sidebar-category-image"
                    src={category.image}
                    alt={category.name}
                  />
                  <span className="sidebar-category-name">{category.name}</span>
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

        <div className="products-container">
          <h1 className="products-title">Flash Sales</h1>
          <CountdownTimer onCountdownEnd={() => setIsCountdownOver(true)} />
        </div>

        <div className="products">
          {data.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                {!isCountdownOver && (
                  <div className="product-discount">
                    <p>50% OFF</p>
                  </div>
                )}
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.name}
                />
                <div className="product-info">
                  <div className="product-text-container">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price-container">
                      {!isCountdownOver ? (
                        <p className="product-new-price">
                          TND{" "}
                          <CountUp
                            end={product.price / 2}
                            duration={1}
                            decimals={2}
                          />
                        </p>
                      ) : (
                        <p className="product-new-price">TND {product.price}</p>
                      )}
                      <p className="product-old-price">TND {product.price}</p>
                    </div>
                  </div>
                  <button className="product-button">
                    {" "}
                    <svg
                      className="product-button-icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#cccccc"
                        d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425zm3.35 7h7z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default MainPage;
