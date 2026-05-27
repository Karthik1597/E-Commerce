import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db } from "../models/db.js";

const router = express.Router();

/* ================= CREATE UPLOADS FOLDER ================= */
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* ================= MULTER SETUP ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});



/* ================= PRODUCTS ================= */

// GET all products
router.get("/products", (req, res) => {

  db.query(
    "SELECT * FROM products",
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(results);
    }
  );

});

// CREATE product WITH image upload
router.post(
  "/products/upload",
  upload.single("image_file"),
  (req, res) => {

    try {

      console.log("BODY:", req.body);
      console.log("FILE:", req.file);

      const name = req.body?.name;
      const price = req.body?.price;
      const category = req.body?.category || "";

      // VALIDATION
      if (!name || !price) {
        return res.status(400).json({
          error: "Name and price required",
        });
      }

      // IMAGE URL
      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : "";

      // INSERT INTO DATABASE
      const sql =
        "INSERT INTO products (name, price, category, image_url) VALUES (?, ?, ?, ?)";

      db.query(
        sql,
        [name, price, category, imageUrl],
        (err, result) => {

          if (err) {
            console.log("MYSQL ERROR:", err);
            return res.status(500).json(err);
          }

          res.json({
            success: true,
            message: "Product added successfully",
            id: result.insertId,
          });

        }
      );

    } catch (error) {

      console.log("SERVER ERROR:", error);

      res.status(500).json({
        error: "Server error",
      });

    }

  }
);

// UPDATE product
router.put("/products/:id", (req, res) => {

  const { id } = req.params;

  const {
    name,
    price,
    category,
  } = req.body;

  const sql =
    "UPDATE products SET name=?, price=?, category=? WHERE id=?";

  db.query(
    sql,
    [name, price, category, id],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Product updated",
      });

    }
  );

});

// DELETE product
router.delete("/products/:id", (req, res) => {

  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({
        message: "Product deleted",
      });

    }
  );

});

/* ================= USERS ================= */

router.get("/users", (req, res) => {

  db.query(
    "SELECT * FROM users",
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(results);

    }
  );

});

/* ================= ORDERS ================= */

router.get("/orders", (req, res) => {

  db.query(
    "SELECT * FROM orders",
    (err, results) => {

      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(results);

    }
  );

});

export default router;