import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);

const CheckoutForm = () => {
  const { totalPrice, deliveryInfo } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!stripe || !elements) return;

    if (!totalPrice || totalPrice < 2) {
      setError("Minimum payment amount is RM 2.00");
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Create payment intent
      const res = await fetch(
        "http://localhost:5000/api/create-payment-intent",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(totalPrice * 100),
            currency: "myr",
          }),
        }
      );

      const data = await res.json();
      if (!data.clientSecret) {
        throw new Error("Stripe init failed");
      }

      // 2️⃣ Confirm payment
      const result = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setError(result.error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ PAYMENT SUCCESS (UI FIRST)
      setSuccess(true);
      setLoading(false);

      // 4️⃣ SAVE ORDER (NON-BLOCKING 🔥)
      fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: deliveryInfo?.fullName,
          email: deliveryInfo?.email,
          phone: deliveryInfo?.phone,
          country: deliveryInfo?.country,
          address: deliveryInfo?.address,
          totalAmount: totalPrice,
          paymentStatus: "PAID",
          stripePaymentId: result.paymentIntent.id,
        }),
      }).catch((err) =>
        console.error("Order save failed (non-blocking):", err)
      );
    } catch (err) {
      console.error(err);
      setError("Payment failed. Please try again.");
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="payment-success">
        <h2>Payment Successful 🎉</h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="payment-container">
      {deliveryInfo && (
        <div className="delivery-summary">
          <h3>Delivery Details</h3>
          <p><b>Name:</b> {deliveryInfo.fullName}</p>
          <p><b>Email:</b> {deliveryInfo.email}</p>
          <p><b>Phone:</b> {deliveryInfo.phone}</p>
          <p><b>Country:</b> {deliveryInfo.country}</p>
          <p><b>Address:</b> {deliveryInfo.address}</p>
        </div>
      )}

      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Payment</h2>

        <CardElement className="card-element" />

        {error && <div className="payment-error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : `Pay RM ${totalPrice}`}
        </button>
      </form>
    </div>
  );
};

const Payment = () => (
  <div className="payment-page">
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  </div>
);

export default Payment;
