const express = require("express");
const router = express.Router();
const userController = require("./controller");

router.get(
  "/is-exist/:usernameOrEmail",
  userController.checkUsernameOrEmailExist
);

module.exports = router;
