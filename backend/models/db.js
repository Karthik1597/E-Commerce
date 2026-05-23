
// backend/models/db.js
import mysql from "mysql2";

// Create a MySQL connection pool (recommended for production)
export const db = mysql.createPool({
  host: "localhost",       // Your MySQL host, usually localhost
  user: "ecom_user",            // Your MySQL username
  password: "shopify@123", // Replace with your MySQL password
  database: "shopify", // Replace with your DB name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional: test connection immediately
db.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL connection failed:", err);
  } else {
    console.log("Connected to MySQL database successfully!");
    connection.release(); // release back to pool
  }
});

