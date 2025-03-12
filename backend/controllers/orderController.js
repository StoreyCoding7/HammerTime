const pool = require("../db");

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { items, totalAmount } = req.body;

    if (!userId || !items || items.length === 0 || !totalAmount) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = await pool.query(
      "INSERT INTO orders (user_id, total_amount) VALUES ($1, $2) RETURNING *",
      [userId, totalAmount]
    );

    const orderId = newOrder.rows[0].id;

    for (const item of items) {
      await pool.query(
        "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.productId, item.quantity]
      );
    }

    res.status(201).json({ message: "Order placed successfully", order: newOrder.rows[0] });
  } catch (error) {
    console.error("Order placement error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//  Ensure correct export
module.exports = { placeOrder };
