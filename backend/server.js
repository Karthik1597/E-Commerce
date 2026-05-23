import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import adminRoutes from "./routes/adminRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // ✅ ADD THIS

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);   // order save + fetch
app.use("/api", orderRoutes);          // payment intent
app.use("/api/auth", authRoutes);      // ✅ signup & login
app.use("/uploads", express.static("uploads"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
