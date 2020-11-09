const express = require("express");
const router = express.Router();
const postController = require("./controller");
const { auth } = require("../../middleware");
router.get("/", async (req, res) => {
  res.json(await postController.getPosts(req, res));
});
router.get("/get/:id", async (req, res) => {
  res.json(await postController.getPostById(req, res));
});

router.post("/create", auth, async (req, res) => {
  res.json(await postController.createPost(req, res));
});
router.put("/update", auth, async (req, res) => {
  res.json(await postController.updatePost(req, res));
});

router.delete("/delete/:id", auth, async (req, res) => {
  res.json(await postController.deletePost(req, res));
});

module.exports = router;
