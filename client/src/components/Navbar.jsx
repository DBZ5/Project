import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/search`, {
        params: { q: query, filter }
      });
      setSearchResults(response.data);
      setIsSearchOpen(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };


  const handleResultClick = (item) => {
    navigate(`/product/${item.id}`);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

  return (
    <nav>
      <NavLink to="/">
        <h1 className="nav-title">Exclusive</h1>
      </NavLink>
      <ul className="nav-links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          Sign Up
        </NavLink>
      </ul>

      <div className="buttons-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setIsSearchOpen(true)}
            onBlur={() => setTimeout(() => setIsSearchOpen(false), 100)}
          />
         
          {isSearchOpen && searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((item) => (
                <div
                  key={item.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(item)}
                >
                  <img src={item.image} alt={item.name} className="search-result-image" />
                  <div className="search-result-details">
                    <p className="search-result-name">{item.name}</p>
                    <p className="search-result-price">${item.price} ({item.type})</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="nav-buttons"
          id="cart-button"
          onClick={() => navigate("/cart")}
        >
          <svg
            className="nav-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
          >
            <path d="M7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M6.15 6l2.4 5h7l2.75-5zM5.2 4h14.75q.575 0 .875.513t.025 1.037l-3.55 6.4q-.275.5-.737.775T15.55 13H8.1L7 15h11q.425 0 .713.288T19 16t-.288.713T18 17H7q-1.125 0-1.7-.987t-.05-1.963L6.6 11.6L3 4H2q-.425 0-.712-.288T1 3t.288-.712T2 2h1.625q.275 0 .525.15t.375.425zm3.35 7h7z" />
          </svg>
        </button>
        <button className="nav-buttons" onClick={toggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="#000000"
              d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
            />
          </svg>
        </button>
        {showDropdown && (
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={() => navigate("/profile")}>Manage My Account</div>
            <div className="dropdown-item" onClick={() => navigate("/wishlist")}>My wishlist</div>
            <div className="dropdown-item">My Cancellations</div>
            <div className="dropdown-item">My Reviews</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
