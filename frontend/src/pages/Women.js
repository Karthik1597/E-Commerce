import React, { useContext } from "react";
import "./Men.css";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const womenProducts = [
  { id: 11, name: "Women Casual Dress", price: 45, image: "/images/women/women1.jpg" },
  { id: 12, name: "Women Formal Dress", price: 65, image: "/images/women/women2.jpg" },
  { id: 13, name: "Women Top", price: 35, image: "/images/women/women3.jpg" },
  { id: 14, name: "Women Jacket", price: 80, image: "/images/women/women4.jpg" },
  { id: 15, name: "Women Skirt", price: 40, image: "/images/women/women5.jpg" },
  { id: 16, name: "Women Hoodie", price: 70, image: "/images/women/women6.jpg" },
  { id: 17, name: "Women Hoodie", price: 70, image: "/images/women/women7.jpg" },
  { id: 18, name: "Women Hoodie", price: 70, image: "/images/women/women8.jpg" },
];

const Women = () => {
  const { cartItems, addToCart, removeFromCart } =
    useContext(CartContext);

  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="men-page">
      {/* CART ICON */}
      <div className="cart-top-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={26} />
          {totalQty > 0 && <span className="cart-dot"></span>}
        </Link>
      </div>

      <h2 className="men-title">Women Collection</h2>

      <div className="men-grid">
        {womenProducts.map((item) => (
          <div className="men-card" key={item.id}>
            <div className="men-img-box">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="men-info">
              <h3>{item.name}</h3>
              <p className="price">RM {item.price}</p>

              <div className="qty-box">
                <button
                  onClick={() => {
                    if (getQty(item.id) > 0)
                      removeFromCart(item.id);
                  }}
                >
                  -
                </button>

                <span>{getQty(item.id)}</span>

                <button onClick={() => addToCart(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;
