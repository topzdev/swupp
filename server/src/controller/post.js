const Post = require("../models/post/Post");

const createPost = async () => {
  const post = await Post.create({});
};
