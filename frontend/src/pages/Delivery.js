// frontend/src/pages/Delivery.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CartContext } from "../context/CartContext";
import "react-toastify/dist/ReactToastify.css";
import "./Delivery.css";

const Delivery = () => {
  const navigate = useNavigate();
  const { setDeliveryInfo } = useContext(CartContext);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Save delivery info in context
    setDeliveryInfo(form);

    toast.success("Delivery details submitted successfully!", {
      position: "top-right",
      autoClose: 2000,
    });

    // ✅ Navigate to Payment after 2s
    setTimeout(() => navigate("/payment"), 2000);
  };

  return (
    <div className="delivery-page">
      <ToastContainer />
      <div className="delivery-card">
        <h2>Delivery Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Full Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="delivery-btn">
            Confirm Delivery
          </button>
        </form>
      </div>
    </div>
  );
};

export default Delivery;
