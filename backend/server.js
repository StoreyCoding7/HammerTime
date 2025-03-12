const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logger
app.use(express.urlencoded({ extended: true })); // Handle form data parsing

// Import Routes (Fixing the duplicate issue)
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("HammerTime is running...");
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "Server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
