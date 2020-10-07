const express = require("express");
const router = express.Router();

router.get("/me", (req, res) => {
  // get user information
  res.send("Create Post");
});

module.exports = router;
