const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/register", (req, res) => {
  res.send("Register");
});

router.post("/forgot-password", (req, res) => {
  res.send("Forgor Password");
});

router.post("/change-password", (req, res) => {
  res.send("Change Password");
});

module.exports = router;
