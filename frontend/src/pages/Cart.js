import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartIcon from "../components/CartIcon";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, totalPrice } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <CartIcon />
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <span>🛒</span>
          <p>Your cart is empty</p>
          <p>Add some products to continue</p>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p className="cart-price">RM {item.price}</p>

                  <div className="cart-qty">
                    <button onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="cart-total">
            <h3>Order Summary</h3>
            <p>Total: RM {totalPrice.toFixed(2)}</p> {/* Format to 2 decimals */}

            <button onClick={() => navigate("/delivery")}>
              Proceed to Delivery
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
