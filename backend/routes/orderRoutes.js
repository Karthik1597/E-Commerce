import dotenv from "dotenv";
dotenv.config(); // ✅ MUST be before Stripe init

import express from "express";
import Stripe from "stripe";
import { db } from "../models/db.js";

const router = express.Router();

// ✅ NOW env is available
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/* ===============================
   CREATE STRIPE PAYMENT INTENT
================================ */
router.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || amount < 1) {
      return res.status(400).json({ error: "Invalid payment amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    console.error("Stripe Error:", err.message);
    res.status(500).json({ error: "Payment failed" });
  }
});

/* ===============================
   SAVE ORDER
================================ */
router.post("/", (req, res) => {
  const {
    fullName,
    email,
    phone,
    country,
    address,
    totalAmount,
    paymentStatus,
    stripePaymentId,
  } = req.body;

  if (!fullName || !email || !phone || !address || !totalAmount) {
    return res.status(400).json({ message: "Missing order data" });
  }

  const sql = `
    INSERT INTO orders
    (full_name, email, phone, country, address, total_amount, payment_status, stripe_payment_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    fullName,
    email,
    phone,
    country,
    address,
    totalAmount,
    paymentStatus || "PAID",
    stripePaymentId || null,
  ];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Order Save Error:", err);
      return res.status(500).json({ message: "Order save failed" });
    }
    res.status(201).json({ message: "✅ Order saved successfully" });
  });
});

export default router;
