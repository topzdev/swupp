const express = require("express");
const router = express.Router();
const authController = require("../auth/controller");

router.get("/me", authController.me);

router.post("/sign-in", authController.signIn);

router.post("/sign-up", authController.signUp);

router.post("/forgot-password", authController.forgotPassword);

router.post("/change-password", authController.changePassword);

module.exports = router;
