const express = require("express");
const pool = require("../db");
const router = express.Router();


const { placeOrder } = require("../controllers/orderController");
const { authenticateUser } = require("../middleware/authMiddleware");


// Create a new order (Uses the controller function)
router.post("/", authenticateUser, placeOrder);


// Get the logged-in user's orders
router.get("/user", authenticateUser, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userOrders = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json(userOrders.rows);
  } catch (error) {
    console.error("Fetching user orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get a specific order by ID
router.get("/:id", authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const order = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);

    if (order.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Ensure the order belongs to the logged-in user or they are an admin
    if (order.rows[0].user_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized to view this order" });
    }

    res.status(200).json(order.rows[0]);
  } catch (error) {
    console.error("Fetching order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// Get all orders (Admin only)
router.get("/", authenticateUser, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    const orders = await pool.query("SELECT * FROM orders ORDER BY created_at DESC");

    res.status(200).json(orders.rows);
  } catch (error) {
    console.error("Fetching all orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
