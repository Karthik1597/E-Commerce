// frontend/src/context/CartContext.js
import React, { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryInfo, setDeliveryInfo] = useState(null); // <-- add this

  const addToCart = (item) => {
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existingItem = cartItems.find((i) => i.id === id);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((i) => i.id !== id));
    } else {
      setCartItems(
        cartItems.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        totalPrice,
        deliveryInfo,       // <-- export delivery info
        setDeliveryInfo,    // <-- export setDeliveryInfo
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
