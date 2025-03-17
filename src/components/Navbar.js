import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, ShoppingCart, Search } from "lucide-react"; // Import Search Icon
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);

  // Fetch search results when typing
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setSearchDropdownOpen(false);
      return;
    }

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/products/search?query=${searchQuery}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Search Results:", data); // Debugging output
        setSearchResults(data);
        setSearchDropdownOpen(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <nav id="Navbar">
      {/* Logo */}
      <Link to="/" id="Home">
        <img src="/HammerTime-Logo.png" alt="HammerTime Logo" id="logo" />
      </Link>

      <div className="nav-icons">
        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchDropdownOpen(true)}
          />
          <Search size={24} className="search-icon" />

          {/* Search Dropdown */}
          {searchDropdownOpen && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((product) => (
                <div key={product.id} className="search-item">
                  <Link to={`/products/${product.id}`} onClick={() => setSearchDropdownOpen(false)} className="search-item-link">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="search-item-image"
                        onError={(e) => (e.target.style.display = "none")} // Hide broken images
                      />
                    )}
                    <span>{product.name}</span>
                  </Link>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shopping Cart Icon */}
        <Link to="/cart" className="cart-icon">
          <ShoppingCart size={24} />
        </Link>

        {/* Dropdown Menu */}
        <div className="dropdown-container">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            <Menu size={24} />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <Link to="/products">Products</Link>
                  <Link to="/orders">Orders</Link>
                  <Link onClick={logout}>Logout</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                  <Link to="/products">Products</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
