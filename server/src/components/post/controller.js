const { parsePostData, parsePostUpdate } = require("./helpers");
const postService = require("./service");

exports.createPost = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const post = parsePostData(files, body);
    const data = await postService.createPost({
      ...post,
      userId: req.session.userId,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await postService.getPostById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.getPreviewPostById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await postService.getPreviewPostById(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getCurrentUserPost = async (req) => {
  return true;
};

exports.getPosts = async (req, res) => {
  try {
    console.log("Query", req.body);
    const result = await postService.getPosts(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPostCount = async (req, res) => {
  try {
    const result = await postService.getPostsCount();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const post = parsePostUpdate(files, body);
    console.log(post);
    const result = await postService.updatePost(post);

    console.log("Post", post);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("ID", id);
    const result = await postService.removePost({ id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
