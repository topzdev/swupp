const Post = require("./components/post/models/Post");
const User = require("./components/user/models/User");
const Profile = require("./components/user/models/Profile");

const drop = async () => {
  await Post.drop();
  await Profile.drop();
  await User.drop();
};

const create = async () => {
  await User.sync({ alter: true });
  await Post.sync({ alter: true });
  await Profile.sync({ alter: true });
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
