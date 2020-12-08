const express = require("express");
const { auth } = require("../../middleware");
const router = express.Router();
const userController = require("./controller");

router.get(
  "/is-exist/:usernameOrEmail",
  userController.checkUsernameOrEmailExist
);

router.put("/change-username", auth, userController.changeUsername);
router.put("/change-password", auth, userController.changePassword);
router.put("/change-deactivate", auth, userController.deactivate);
router.put("/change-email", auth, userController.changeEmail);
router.put("/change-info", auth, userController.changeAccountInfo);

module.exports = router;
