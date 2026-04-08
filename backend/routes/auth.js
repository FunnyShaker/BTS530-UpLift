const express = require("express");
const User = require("../models/User");
const router = express.Router();

//SIGNUP
router.post("/signup", async (req, res) => {
  const { email, password, fullName, userType } = req.body;

  console.log("[SIGNUP] Incoming request body:", { email, fullName, userType, password: password ? "***" : undefined });

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.warn(`[SIGNUP] Duplicate email attempt: ${email}`);
      return res.status(400).json({ message: "email already taken" });
    }

    const user = await User.create({ email, password, fullName, userType });
    req.session.userId = user._id;
    console.log(`[SIGNUP] User created successfully: id=${user._id} email=${email} userType=${userType}`);

    res.status(201).json({
      message: "Signup successful",
      user: { fullName, email, userType },
    });
  } catch (err) {
    console.error("[SIGNUP] Error name:", err.name);
    console.error("[SIGNUP] Error message:", err.message);
    console.error("[SIGNUP] Error code:", err.code);
    if (err.name === "ValidationError") {
      console.error("[SIGNUP] Mongoose validation errors:", JSON.stringify(err.errors, null, 2));
    }
    console.error("[SIGNUP] Full error stack:\n", err.stack);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    if (user.password === password) {
      req.session.userId = user._id;
      return res.json({
        message: "Login successful",
        user: { fullName: user.fullName, email: user.email },
      });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

//LOGOUT
router.post('/logout' , (req , res) => {
    req.session.destroy(() => {
        res.json({message : 'logout'})
    })
})

module.exports = router