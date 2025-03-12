const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware"); // Import authenticateUser

const router = express.Router();

// Example of a protected route
router.get("/profile", authenticateUser, (req, res) => {
  // This route is protected by authenticateUser
  res.status(200).json({ message: "Profile data", user: req.user });
});

module.exports = router;
