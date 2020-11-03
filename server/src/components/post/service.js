const Post = require("./models/Post");
const User = require("../user/models/User");

exports.createPost = async ({
  title,
  price,
  body,
  isPriceHidden,
  categoryId,
  conditionId,
  prefered,
  userId,
  isDraft,
  photos,
}) => {
  // insert post to database
  const post = await Post.create({
    title,
    price,
    body,
    isPriceHidden,
    categoryId,
    conditionId,
    prefered,
    userId,
    isDraft,
  });

  // upload photo to image storage

  // save photo details on database

  // return id and success message to frontendt
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
