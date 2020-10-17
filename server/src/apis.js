const express = require("express");
const router = express.Router();
const authAPI = require("./components/auth/api");
const postAPI = require("./components/post/api");

router.use("/auth/", authAPI);
router.use("/post/", postAPI);

router.use("/", (req, res) => {
  res.send("Hello, World");
});

module.exports = router;
