require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: ", err);
    } else {
        console.log("✅ Connected to Namecheap MySQL database.");
    }
});


// 📌 API to handle quote requests
app.post("/api/request-quote", (req, res) => {
    const { name, country, phone, pickup, destination } = req.body;

    // Check if all fields are filled
    if (!name || !country || !phone || !pickup || !destination) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO quotes (name, country, phone, pickup, destination) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, country, phone, pickup, destination], (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Quote request submitted successfully!" });
    });
});

// 📌 API to get all requests (for admin)
app.get("/api/quotes", (req, res) => {
    db.query("SELECT * FROM quotes ORDER BY created_at DESC", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
