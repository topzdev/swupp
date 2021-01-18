const Post = require("./components/post/models/Post");
const PostPhoto = require("./components/post/models/PostPhoto");
const User = require("./components/user/models/User");
const Profile = require("./components/profile/models/Profile");
const ProfilePhoto = require("./components/profile/models/ProfilePhoto");
const CoverPhoto = require("./components/profile/models/CoverPhoto");
const PostLocation = require("./components/post/models/PostLocation");
const PostLikes = require("./components/post/models/PostLikes");
const PostSaves = require("./components/post/models/PostSaves");
const { __prod__ } = require("./constants");

const drop = async () => {
  await Profile.drop();
  await PostPhoto.drop();
  await PostLocation.drop();
  await Post.drop();
  await User.drop();
  await CoverPhoto.drop();
  await ProfilePhoto.drop();
};

const create = async (alter) => {
  await User.sync({ alter });
  await Post.sync({ alter });
  // await PostSaves.sync({ alter });
  await PostLikes.sync({ alter });
  await PostPhoto.sync({ alter });
  await PostLocation.sync({ alter });
  await ProfilePhoto.sync({ alter });
  await CoverPhoto.sync({ alter });
  await Profile.sync({ alter });
};

const associations = async () => {
  await User.hasOne(Profile);
  await Profile.belongsTo(User);

  await User.hasMany(Post, { foreignKey: "userId", as: "post" });
  await Post.belongsTo(User, { as: "user" });

  await Post.hasOne(PostLocation);
  await PostLocation.belongsTo(Post);
  await Post.hasMany(PostLikes);
  await User.hasMany(PostLikes);
  await PostLikes.belongsTo(Post);
  await User.hasOne(PostLikes);
  await Post.hasMany(PostLikes);

  // await ProfilePhoto.belongsTo(User);

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
  __prod__ ? await create(true) : await create(true);
  // await Post.update({ views: 0 }, { where: { views: null } });
};

module.exports = async () => {
  try {
    await sync();
    // await PostLikes.drop();
    // drop();
  } catch (error) {
    console.error(error);
  }
};
