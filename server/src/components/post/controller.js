const authService = require("./service");

exports.createPost = async (req, res) => {
  try {
    const input = req.body;
    const data = await authService.register(input);
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
    const data = await authService.register(input);
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
