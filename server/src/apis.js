const express = require("express");
const router = express.Router();
const authAPI = require("./api/v1/auth");
const userAPI = require("./api/v1/user");
const postAPI = require("./api/v1/post");

router.use("/auth/", authAPI);
router.use("/user/", userAPI);
router.use("/post/", postAPI);

router.use("/", (req, res) => {
  res.send("Hello, World");
});

module.exports = router;
