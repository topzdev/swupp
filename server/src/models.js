const Post = require("./components/post/models/Post");
const PostPhoto = require("./components/post/models/PostPhoto");
const User = require("./components/user/models/User");
const Profile = require("./components/user/models/Profile");

const drop = async () => {
  await Post.drop();
  await Profile.drop();
  await User.drop();
  await PostPhoto.drop();
};

const create = async () => {
  await User.sync({ alter: true });
  await Post.sync({ alter: true });
  await Profile.sync({ alter: true });
  await PostPhoto.sync({ alter: true });
};

const associations = () => {
  User.hasOne(Profile);
  Profile.belongsTo(User);

  User.hasMany(Post, { foreignKey: "userId" });
  Post.belongsTo(User);

  Post.hasMany(PostPhoto, { foreignKey: "postId" });
  PostPhoto.belongsTo(Post);
};

const sync = async () => {
  await create();
  await associations();
};

module.exports = async () => {
  sync();
  associations();
  // drop();
};
