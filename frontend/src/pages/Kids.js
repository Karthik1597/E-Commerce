import React, { useContext } from "react";
import "./Men.css";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const kidsProducts = [
  { id: 21, name: "Kids Casual Wear", price: 25, image: "/images/kids/kids1.jpg" },
  { id: 22, name: "Kids Party Dress", price: 35, image: "/images/kids/kids2.jpg" },
  { id: 23, name: "Kids T-Shirt", price: 18, image: "/images/kids/kids3.jpg" },
  { id: 24, name: "Kids Jeans", price: 30, image: "/images/kids/kids4.jpg" },
  { id: 25, name: "Kids Jacket", price: 45, image: "/images/kids/kids5.jpg" },
  { id: 26, name: "Kids Hoodie", price: 40, image: "/images/kids/kids6.jpg" },
  { id: 27, name: "Kids Shorts", price: 20, image: "/images/kids/kids7.jpg" },
  { id: 28, name: "Kids Ethnic Wear", price: 50, image: "/images/kids/kids8.jpg" },
];

const Kids = () => {
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

      <h2 className="men-title">Kids Collection</h2>

      <div className="men-grid">
        {kidsProducts.map((item) => (
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

export default Kids;
