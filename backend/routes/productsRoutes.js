const express = require("express");
const router = express.Router();
const pool = require("../db"); // Make sure your database connection file is correctly set up

// Get all products
router.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM products");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Search products by name
router.get("/search", async (req, res) => {
    const { query } = req.query;
    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE name ILIKE $1",
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
