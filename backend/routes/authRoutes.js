import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../models/db.js"; // ✅ named import

const router = express.Router();

/* ===== SIGNUP ===== */
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashed],
      (err) => {
        if (err) return res.status(400).json({ error: "Email already exists" });
        res.json({ message: "Signup successful" });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

/* ===== LOGIN ===== */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, rows) => {
      if (err || rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const valid = await bcrypt.compare(password, rows[0].password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });

      res.json({
        id: rows[0].id,
        name: rows[0].full_name,
        email: rows[0].email,
      });
    }
  );
});

export default router;
