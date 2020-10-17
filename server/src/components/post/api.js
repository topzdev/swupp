const express = require("express");
const router = express.Router();
const postController = require("./controller");

router.get("/", async (req, res) => {
  res.json(await postController.getPosts(req));
});
router.get("/get/:id", async (req, res) => {
  res.json(await postController.createPost(req));
});

router.post("/create", async (req, res) => {
  res.json(await postController.careatePost(req));
});

router.put("/update", async (req, res) => {
  res.json(await postController.createPost(req));
});

router.delete("/delete", async (req, res) => {
  res.json(await postController.createPost(req));
});

module.exports = router;
