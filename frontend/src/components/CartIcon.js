import React, { useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartIcon.css";

const CartIcon = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to="/cart" className="cart-icon">
      <FaShoppingCart size={26} />
      {totalQuantity > 0 && <span className="cart-dot"></span>}
    </Link>
  );
};

export default CartIcon;
