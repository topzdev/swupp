const Post = require("./components/post/models/Post");
const PostPhoto = require("./components/post/models/PostPhoto");
const User = require("./components/user/models/User");
const Profile = require("./components/user/models/Profile");

const drop = async () => {
  await Profile.drop();
  await PostPhoto.drop();
  await Post.drop();
  await User.drop();
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

  User.hasMany(Post, { foreignKey: "userId", as: "post" });
  Post.belongsTo(User, { as: "user" });

  Post.hasMany(PostPhoto, { foreignKey: "postId", as: "photos" });
  PostPhoto.belongsTo(Post);
};

const sync = async () => {
  await associations();
  await create();
};

module.exports = async () => {
  sync();
  // drop();
};
