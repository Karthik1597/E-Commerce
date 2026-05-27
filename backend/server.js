import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);   // order save + fetch
app.use("/api", orderRoutes);          // payment intent
app.use("/api/auth", authRoutes);      // ✅ signup & login
app.use("/uploads", express.static("./uploads"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
