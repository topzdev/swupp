const express = require("express");
const router = express.Router();
const postController = require("./controller");
const { auth, guest } = require("../../middleware");
router.post("/get", async (req, res) => {
  res.json(await postController.getPosts(req, res));
});

router.get("/get/:id", auth, async (req, res) => {
  res.json(await postController.getUserPostById(req, res));
});

router.post("/get-user-post", auth, postController.getCurrentUserPosts);

router.get("/get/preview/:id", guest, async (req, res) => {
  res.json(await postController.getPreviewPostById(req, res));
});

router.get("/count", async (req, res) => {
  res.json(await postController.getPostCount(req, res));
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

router.post("/like", auth, async (req, res) => {
  res.json(await postController.likePost(req, res));
});

module.exports = router;
