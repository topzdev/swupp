const Post = require("./post/Post");
const User = require("./user/User");
const Profile = require("./user/Profile");

const drop = async () => {
  await Post.drop();
  await Profile.drop();
  await User.drop();
};

const create = async () => {
  await User.sync();
  await Post.sync({ alter: true });
  await Profile.sync();
};

const associations = () => {
  User.hasOne(Profile);
  Profile.belongsTo(User);

  User.hasMany(Post, { foreignKey: "userId" });
  Post.belongsTo(User);
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
