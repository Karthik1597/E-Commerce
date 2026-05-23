import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="logo">Shopify</div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/men">Men</Link></li>
        <li><Link to="/women">Women</Link></li>
        <li><Link to="/kids">Kids</Link></li>
      </ul>

      <Link to="/cart" className="cart-icon">
        <FaShoppingCart size={24} />
        {cartItems.length > 0 && <span className="cart-dot"></span>}
      </Link>
    </nav>
  );
};

export default Navbar;
