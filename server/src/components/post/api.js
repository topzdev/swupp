const express = require("express");
const router = express.Router();
const postController = require("./controller");

router.get("/", async (req, res) => {
  res.json(await postController.getPosts(req, res));
});
router.get("/get/:id", async (req, res) => {
  res.json(await postController.createPost(req, res));
});

router.post("/create", async (req, res) => {
  res.json(await postController.createPost(req, res));
});

router.put("/update", async (req, res) => {
  res.json(await postController.createPost(req, res));
});

router.delete("/delete", async (req, res) => {
  res.json(await postController.createPost(req, res));
});

module.exports = router;
