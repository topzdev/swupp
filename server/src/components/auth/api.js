const { verify } = require("argon2");
const express = require("express");
const router = express.Router();
const authController = require("../auth/controller");
const { auth } = require("../../middleware");
router.get("/me", auth, authController.me);

router.post("/sign-in", authController.signIn);

router.post("/sign-up", authController.signUp);

router.post("/forgot-password", authController.forgotPassword);

router.post("/change-password", authController.changePassword);

router.post("/transact-verify", auth, authController.transactVerifiy);

router.post("/confirmation/:token", authController.confirmEmail);

module.exports = router;
