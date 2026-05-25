import express from "express";
import pool from "../models/db.js";
import { adminOnly } from "../middleware/adminAuth.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

// CREATE product
router.post("/", adminOnly, upload.single("image_file"), async (req, res) => {
  const { name, price, category } = req.body;

  const image_url = req.file
    ? `/uploads/${req.file.filename}`
    : null;

  await pool.query(
    "INSERT INTO products (name, price, category, image_url) VALUES (?,?,?,?)",
    [name, price, category, image_url]
  );

  res.json({ message: "Product added" });
});

// READ all products
router.get("/", adminOnly, async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products");
  res.json(rows);
});

// UPDATE product
router.put("/:id", adminOnly, async (req, res) => {
  const { name, price } = req.body;
  await pool.query(
    "UPDATE products SET name=?, price=? WHERE id=?",
    [name, price, req.params.id]
  );
  res.json({ message: "Product updated" });
});

// DELETE product
router.delete("/:id", adminOnly, async (req, res) => {
  await pool.query("DELETE FROM products WHERE id=?", [req.params.id]);
  res.json({ message: "Product deleted" });
});

export default router;
