const express = require("express");

const router = express.Router();


const authRoutes = require('./auth.routes');

router.use("/auth", authRoutes);


router.use("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Gamification API V1",
  });
});

module.exports = router;
