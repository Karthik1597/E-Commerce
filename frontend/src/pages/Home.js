import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import LoginModal from "../components/LoginModal";
import "./Home.css";
import heroImg from "../assets/hero.jpg";

const Home = () => {
  const { cartItems } = useContext(CartContext);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">Shopify</div>

        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/men">Men</Link></li>
          <li><Link to="/women">Women</Link></li>
          <li><Link to="/kids">Kids</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav-right">
          <button
            className="login-btn"
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>

          <Link to="/cart" className="cart-icon-link">
            <FaShoppingCart size={24} color="#e63946" />
            {cartItems.length > 0 && (
              <span className="cart-dot"></span>
            )}
          </Link>
        </div>
      </nav>

      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-left">
          <h1>Discover Your Style</h1>
          <p>
            Shop the latest fashion trends with premium quality products.
          </p>
          <Link to="/men">
            <button className="shop-now-btn">Shop Now</button>
          </Link>
        </div>

        <div className="hero-right">
          <div className="hero-image-round">
            <img src={heroImg} alt="Hero" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
