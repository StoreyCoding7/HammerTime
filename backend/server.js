require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();



// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for frontend requests
app.use(helmet()); // Secure HTTP headers
app.use(morgan("dev")); // Logger
app.use(express.urlencoded({ extended: true })); // This handles form data parsing

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

// Simple test route
app.get("/", (req, res) => {
  res.send("HammerTime is running...");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Server error', error: err.message });
  });
  
