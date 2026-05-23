import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo2.png";
import "./Navbar.css";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

import {
  FiShoppingCart,
  FiUser,
  FiSearch,
} from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const [inputValue, setinputValue] = useState("");
  const [inputError, setinputError] = useState(null);
  //destructire the array since u want 
  const { cartItems,ClearCart } = useContext(CartContext);
  const { token,logout, customer } = useContext(AuthContext);

  //get token for jwt auth based rendering
  // const token = localStorage.getItem("token");

  const handleLogout = async (params) => {
    // localStorage.removeItem("cart");
    ClearCart();
    logout();

    navigate("/login");
  };

  function handleSearch(event) {
    event.preventDefault();
    if (inputValue.length < 3) {
      setinputError("Inputs must contain more than 3 characters.");
      return
    }

    navigate(`/search?name=${inputValue}`);
  };

  return (
    <nav className="navbar">

      {/* LEFT SECTION */}
      <div className="logo-section">
        <Link to="/">
          <img src={logo} alt="ShopEase Logo" className="logo" />
        </Link>

        {/* <h2 className="brand-name">ShopEase</h2> */}
      </div>

      {/* CENTER SECTION */}
      <div className="search-container">
        <form className="search-form" onSubmit={handleSearch}>

          <input
            type="search"
            placeholder="Search products..."
            className="search-input"
            value={inputValue}
            onChange={(e) => { setinputValue(e.target.value); setinputError("") }}
          />

          <button type="submit" className="search-btn">
            <FiSearch />
          </button>


        </form>

        {inputError && (
          <span
            className="search-error">
            {inputError}
          </span>
        )}

      </div>

      {/* RIGHT SECTION */}
      <div className="nav-actions">

        <Link to="/" className="nav-link">
          Home
        </Link>

        {token ? (
          <>
            {
              customer?.role === "admin" ? (

                <>
                  <Link
                    to="/admin/dashboard"
                    className="nav-link"
                  >
                    Dashboard
                  </Link>
                                    <button className="nav-link"
                    onClick={handleLogout}>
                    Logout
                  </button>
                </>

              ) : (

                <>
                  <Link className="icon-link cart-icon" to="/cart">
                    <FiShoppingCart />
                    <span className="cart-count">{cartItems.length}</span>
                  </Link>

                  <button className="nav-link"
                    onClick={handleLogout}>
                    Logout
                  </button>

                  <h3>
                    {customer?.name}
                  </h3>

                  <Link to="/orders">
                    Orders
                  </Link>
                </>

              )
            }
            {/* <Link to="/orders" className="nav-link">
              Orders
            </Link> */}
            {/* <Link className="icon-link cart-icon" to="/cart">
              <FiShoppingCart />
              <span className="cart-count">{cartItems.length}</span>
            </Link>

            <button className="logout"
              onClick={handleLogout}>
              Logout
            </button> */}
{/* 
            <h3>
              {customer?.name}
            </h3> */}

          </>

        )
          : (
            <>
              <Link to="/login" className="icon-link">
                <FiUser />
              </Link>

              <Link to="/signup" className="icon-link">
                Sign Up
              </Link>
            </>

          )
        }
      </div>
    </nav>
  );
}

export default Navbar;