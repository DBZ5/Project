import React, { useState, useEffect } from "react";
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
      const response = await axios.get("http://localhost:3000/api/product");
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
        <h3 className="products-title">Products</h3>
        <div className="products">
          {data.map((product) => {
            return (
              <div className="product-card" key={product.id}>
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
                      <p className="product-new-price">TND {product.price}</p>
                      <p className="product-old-price">
                        TND {product.price * 2}
                      </p>
                    </div>
                  </div>
<<<<<<< HEAD
                );
              })}
            </div>
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
=======
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

>>>>>>> 08252e551b47daa1b1061f48848abca6bb284794
        </div>
      </main>
    </>
  );
};

export default MainPage;
