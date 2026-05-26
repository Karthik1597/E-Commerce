import express from "express";
import multer from "multer";
import path from "path";
import { db } from "../models/db.js";

const router = express.Router();

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* ================= PRODUCTS ================= */

// GET all products
router.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// CREATE product WITH image upload
router.post("/products/upload", upload.single("image_file"), (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const { name, price, category } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: "Name & price required" });
  }

  const imageUrl = req.file
  ? `/uploads/${req.file.filename}`
  : "";

  const sql =
    "INSERT INTO products (name, price, category, image_url) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, price, category, imageUrl], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added", id: result.insertId });
  });
});

// UPDATE product name
router.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db.query(
    "UPDATE products SET name=? WHERE id=?",
    [name, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// DELETE product
router.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

/* ================= USERS ================= */
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/* ================= ORDERS ================= */
router.get("/orders", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

export default router;
