const Post = require("../models/post/Post");

exports.createPost = async () => {
  const post = await Post.create({});
};
