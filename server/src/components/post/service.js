const Post = require("./models/Post");
const User = require("../user/models/User");

exports.createPost = async ({
  title,
  price,
  categoryId,
  qualityId,
  conditionId,
  prefered,
}) => {
  const userId = 1;
  const post = await Post.create({
    title,
    price,
    // categoryId,
    // qualityId,
    // conditionId,
    prefered,
    userId,
  });

  return {
    data: {
      message: "Post successfully added",
    },
  };
};

exports.getCurrentUserPost = async (req) => {
  return true;
};

exports.getPosts = async (req) => {
  const posts = await Post.findAll({
    include: { model: User, attributes: { include: ["id", "username"] } },
  });

  return { data: { posts } };
};

exports.updatePost = async (req) => {
  return true;
};

exports.deletePost = async (req) => {
  return true;
};
