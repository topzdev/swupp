const Post = require("./components/post/models/Post");
const PostPhoto = require("./components/post/models/PostPhoto");
const User = require("./components/user/models/User");
const Profile = require("./components/profile/models/Profile");
const ProfilePhoto = require("./components/profile/models/ProfilePhoto");
const CoverPhoto = require("./components/profile/models/CoverPhoto");
const PostLocation = require("./components/post/models/PostLocation");
const drop = async () => {
  await Profile.drop();
  await PostPhoto.drop();
  await Post.drop();
  await User.drop();
  await CoverPhoto.drop();
  await ProfilePhoto.drop();
};

const create = async () => {
  await User.sync({ alter: true });
  await Post.sync({ alter: true });
  await PostPhoto.sync({ alter: true });
  await PostLocation.sync({ alter: true });
  await ProfilePhoto.sync({ alter: true });
  await CoverPhoto.sync({ alter: true });
  await Profile.sync({ alter: true });
};

const associations = async () => {
  await User.hasOne(Profile);
  await Profile.belongsTo(User);

  await User.hasMany(Post, { foreignKey: "userId", as: "post" });
  await Post.belongsTo(User, { as: "user" });

  await Post.hasOne(PostLocation);
  await PostLocation.belongsTo(Post);

  await ProfilePhoto.hasOne(Profile, {
    foreignKey: "profilePhotoId",
    as: "profilePhoto",
  });

  await Profile.belongsTo(ProfilePhoto, {
    // foreignKey: "profilePhotoId",
  });
  await CoverPhoto.hasOne(Profile, {
    foreignKey: "coverPhotoId",
    as: "coverPhoto",
  });
  await Profile.belongsTo(CoverPhoto, {
    // foreignKey: "coverPhotoId",
  });

  await Post.hasMany(PostPhoto, { foreignKey: "postId", as: "photos" });
  await PostPhoto.belongsTo(Post);
};

const sync = async () => {
  await associations();
  await create();
  // await Post.update({ views: 0 }, { where: { views: null } });
};

module.exports = async () => {
  sync();
  // drop();
};
