import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import CountdownTimer from "./Counter";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } from '../store/productSlice';
import axios from 'axios';

const MainPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [flash, setFlash] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = [
    {
      name: "Women's Fashion",
      query: "Women",
      id: 1,
      image:
        "https://api.iconify.design/icon-park-twotone:full-dress-longuette.svg",
    },
    {
      name: "Men's Fashion",
      query: "Men",
      id: 2,
      image: "https://api.iconify.design/fluent:clothes-hanger-16-filled.svg",
    },
    {
      name: "Electronics",
      query: "Electronics",
      id: 3,
      image: "https://api.iconify.design/line-md:cellphone-twotone.svg",
    },
    {
      name: "Home & Kitchen",
      query: "Home",
      id: 4,
      image:
        "https://api.iconify.design/streamline:food-kitchenware-fork-spoon-fork-spoon-food-dine-cook-utensils-eat-restaurant-dining.svg",
    },
    {
      name: "Beauty & Health",
      query: "Beauty",
      id: 5,
      image: "https://api.iconify.design/material-symbols:gfit-health.svg",
    },
    {
      name: "Sports & Outdoors",
      query: "Sports",
      id: 6,
      image:
        "https://api.iconify.design/material-symbols-light:sports-basketball.svg",
    },
  ];

  const images = [
    "https://i.postimg.cc/wBKJYLWd/image.png",
    "https://i.postimg.cc/K8LVbXPp/Frame-1.png",
    "https://i.postimg.cc/BQD9S1sC/Frame-2.png",
  ];

  const [isCountdownOver, setIsCountdownOver] = useState(false);

  const fetchFlash = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/product`
      );
      const flash = await response.json();
      setFlash(flash);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBestSelling = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bestSelling`
      );
      const bestSelling = await response.json();
      setBestSelling(bestSelling);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [images.length]);

  const fetchAllProducts = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/allProducts`
    );
    const allProducts = await response.json();
    setAllProducts(allProducts);
  };

  const fetchProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/allProducts`);
      dispatch(fetchProductsSuccess(response.data));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };

  useEffect(() => {
    fetchFlash();
    fetchBestSelling();
    fetchAllProducts();
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <div className="hero">
          <div className="sidebar">
            <h3 className="sidebar-title">Categories</h3>
            <ul>
              {categories.map((category) => (
                <Link
                  to={`/all-products?category=${category.query}`}
                  key={category.id}
                >
                  <li className="sidebar-category">
                    <img
                      className="sidebar-category-image"
                      src={category.image}
                      alt={category.name}
                    />
                    <span className="sidebar-category-name">
                      {category.name}
                    </span>
                  </li>
                </Link>
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
          {Array.isArray(flash) && flash.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
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
                            start={product.price}
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
            </Link>
          ))}
        </div>

        <div className="best-selling-products-container">
          <h1 className="products-title">Best Selling</h1>
          <div className="best-selling-button-container">
            <Link to="/best-selling">
              <button className="best-selling-button">View All</button>
            </Link>
          </div>
        </div>
        <div className="products">
          {bestSelling.slice(0, 3).map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
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
            </Link>
          ))}
        </div>

        <div className="best-selling-products-container">
          <h1 className="products-title">All Products</h1>
          <div className="best-selling-button-container">
            <Link to="/all-products">
              <button className="best-selling-button">View All</button>
            </Link>
          </div>
        </div>
        <div className="products">
          {products.slice(0, 3).map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-link">
              <div className="product-card">
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
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default MainPage;