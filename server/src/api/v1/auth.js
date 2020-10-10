const express = require("express");
const router = express.Router();
const userController = require("../../controller/user");

router.get("/me", async (req, res) => {
  res.json(await userController.me(req));
});

router.post("/login", async (req, res) => {
  res.json(await userController.login(req));
});

router.post("/register", async (req, res) => {
  res.json(await userController.register(req));
});

router.post("/forgot-password", (req, res) => {
  res.send("Forgor Password");
});

router.post("/change-password", (req, res) => {
  res.send("Change Password");
});

module.exports = router;
