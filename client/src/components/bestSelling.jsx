import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const BestSelling = () => {
  const [bestSelling, setBestSelling] = useState([]);

  const fetchBestSelling = async () => {
    try {
      const response = await axios.get(
      ` ${import.meta.env.VITE_API_URL}/api/bestSelling/`
      );
      setBestSelling(response.data);
    } catch (error) {
      console.error("Error fetching best selling products:", error);
    }
  };

  useEffect(() => {
    fetchBestSelling();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="best-selling-products-container">
        <h1 className="products-title">Best Selling</h1>
      </div>
      <div className="products">
        {bestSelling.map((product) => {
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

export default BestSelling;
