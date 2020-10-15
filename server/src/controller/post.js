const Post = require("../models/post/Post");
const Profile = require("../models/user/Profile");
const User = require("../models/user/User");

exports.createPost = async (req) => {
  const userId = 1;
  const {
    title,
    price,
    categoryId,
    qualityId,
    conditionId,
    prefered,
  } = req.body;

  const post = await Post.create({
    title,
    price,
    // categoryId,
    // qualityId,
    // conditionId,
    prefered,
    userId,
  });

  console.log(post);

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
