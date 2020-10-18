const express = require("express");
const authAPI = require("./components/auth/api");
const postAPI = require("./components/post/api");
const userAPI = require("./components/user/api");

const router = express.Router();
router.use("/auth/", authAPI);
router.use("/user/", userAPI);
router.use("/post/", postAPI);

router.use("/", (req, res) => {
  res.send("Hello, World");
});

module.exports = router;
