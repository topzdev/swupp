const express = require("express");
const router = express.Router();

router.get("/create", (req, res) => {
  res.send("Create Post");
});

router.get("/get/:id", (req, res) => {
  res.send("Get Single Post ");
});

router.get("/getAll", (req, res) => {
  res.send("Get All Post by Condition");
});

router.put("/update", (req, res) => {
  res.send("Update Post");
});

router.delete("/delete", (req, res) => {
  res.send("Update Post");
});

module.exports = router;
