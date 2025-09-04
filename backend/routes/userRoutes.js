const express = require("express");
const router = express.Router();
const { registerUser, authUser } = require("../controllers/userController");

// Signup
router.post("/signup", registerUser);

// Login
router.post("/login", authUser);

module.exports = router;
