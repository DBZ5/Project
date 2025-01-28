import React from "react";
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
        </div>
      </main>
    </>
  );
};

export default MainPage;
