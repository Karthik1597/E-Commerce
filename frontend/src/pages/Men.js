import React, { useContext } from "react";
import "./Men.css";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const menProducts = [
  { id: 1, name: "Men Casual Shirt", price: 45, image: "/images/men/men1.jpg" },
  { id: 2, name: "Men Formal Shirt", price: 55, image: "/images/men/men2.jpg" },
  { id: 3, name: "Men T-Shirt", price: 35, image: "/images/men/men3.jpg" },
  { id: 4, name: "Men Jeans", price: 60, image: "/images/men/men4.jpg" },
  { id: 5, name: "Men Jacket", price: 85, image: "/images/men/men5.jpg" },
  { id: 6, name: "Men Hoodie", price: 70, image: "/images/men/men6.jpg" },
  { id: 7, name: "Men Hoodie", price: 70, image: "/images/men/men7.jpg" },
  { id: 8, name: "Men Hoodie", price: 70, image: "/images/men/men8.jpg" },
];

const Men = () => {
  const { cartItems, addToCart, removeFromCart } =
    useContext(CartContext);

  // get quantity of a product
  const getQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  // TOTAL quantity (IMPORTANT for green dot)
  const totalQty = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="men-page">
      {/* ===== CART ICON (TOP RIGHT) ===== */}
      <div className="cart-top-right">
        <Link to="/cart" className="cart-icon">
          <FaShoppingCart size={26} />
          {totalQty > 0 && <span className="cart-dot"></span>}
        </Link>
      </div>

      <h2 className="men-title">Men Collection</h2>

      <div className="men-grid">
        {menProducts.map((item) => (
          <div className="men-card" key={item.id}>
            {/* IMAGE */}
            <div className="men-img-box">
              <img src={item.image} alt={item.name} />
            </div>

            {/* INFO */}
            <div className="men-info">
              <h3>{item.name}</h3>
              <p className="price">RM {item.price}</p>

              {/* QUANTITY */}
              <div className="qty-box">
                <button
                  onClick={() => {
                    if (getQty(item.id) > 0) {
                      removeFromCart(item.id);
                    }
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

export default Men;
