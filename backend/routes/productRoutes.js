import express from "express";
import pool from "../models/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM products");
  res.json(rows);
});

export default router;
