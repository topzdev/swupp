const express = require("express");
const router = express.Router();
const userController = require("../../controller/user");

router.post("/login", (req, res) => {
  res.send("Login");
});

router.post("/register", async (req, res) => {
  res.json(await userController.register(req, res));
});

router.post("/forgot-password", (req, res) => {
  res.send("Forgor Password");
});

router.post("/change-password", (req, res) => {
  res.send("Change Password");
});

module.exports = router;
