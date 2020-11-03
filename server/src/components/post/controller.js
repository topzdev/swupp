const { parsePostData } = require("./helpers");
const postService = require("./service");

exports.createPost = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const post = parsePostData(files, body);
    console.log("Body", post);
    const data = await postService.createPost({
      ...post,
      userId: req.session.userId,
    });
    res.status(200).json(data);
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

exports.updatePost = async (req) => {
  return true;
};

exports.deletePost = async (req) => {
  return true;
};
