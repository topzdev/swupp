const { parsePostData, parsePostUpdate } = require("./helpers");
const postService = require("./service");

exports.createPost = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const post = parsePostData(files, body);
    console.log("Body", post);
    console.log("userId", req.session.userId);
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

exports.getCurrentUserPost = async (req) => {
  return true;
};

exports.getPosts = async (req) => {
  try {
    const input = req.body;
    const data = await postService.register(input);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    console.log("files", files);
    console.log("body", body);
    const post = parsePostUpdate(files, body);
    const result = await postService.updatePost(post);

    console.log("Post", post);

    res.status(200).json({ data: null });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deletePost = async (req) => {
  try {
    const id = req.body.id;
    const data = await postService.removePost({ id });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
