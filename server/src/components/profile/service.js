const ProfileModel = require("./models/Profile");
const ProfilePhoto = require("./models/ProfilePhoto");
const UserModel = require("../user/models/User");
const CoverPhoto = require("./models/CoverPhoto");
const PostModel = require("../post/models/Post");
const PostLikesModel = require("../post/models/PostLikes");
const returnError = require("../../utils/returnError");
const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const photoServices = require("../photo/services");
const PostPhotoModel = require("../post/models/PostPhoto");
const ProfilePhotoModel = require("./models/ProfilePhoto");
const CoverPhotoModel = require("./models/CoverPhoto");
const profileHelpers = require("./helpers");
const { Op } = require("sequelize");

// allows the user to check the about section of the users profile
exports.getProfileAbout = async (username) => {
  //if the username does not match to username needed it will throw an error saying the message below.
  if (!username) throw returnError("username", "username not provided");

  // if the username is correct it will find the matching user profile and display the personal information
  //of the user that may be seen in the about section.
  let data = await ProfileModel.findOne({
    include: [
      {
        model: UserModel,
        where: { username },
        attributes: ["email", "phoneNumber", "username"],
      },
    ],
  });

  data = data.get({ plain: true });
  data = { ...data, ...data.user };
  delete data.user;
  return data;
};

// This function enables the user to check their profile.
exports.getProfile = async (username) => {
  //finds a username that will match an existing account or checks if the username match the username needed
  if (!username) throw returnError("username", "username not provided");
  const data = await ProfileModel.findOne({
    attributes: [
      "firstname",
      "lastname",
      "fbUrl",
      "instaUrl",
      "websiteUrl",
      "twitterUrl",
      "birthdate",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM "post" AS postcount WHERE postcount."userId" = "user".id AND postcount."deletedAt" IS NULL)`
        ),
        "postCount",
      ],
    ],

    // this includes all the items or data that will be displayed in the profile of the user
    include: [
      {
        model: UserModel,
        where: { username, [Op.not]: { isActive: false } },
        attributes: ["username"],
      },
      {
        model: CoverPhoto,
        as: "coverPhoto",
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
      {
        model: ProfilePhoto,
        as: "profilePhoto",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
  });

  // if the data is incorrect it returns the error message below.
  if (!data) throw returnError("profile", "profile not exist");

  return data;
};

// Gets the number of items that the user had posted
exports.getPostCountByUser = async (username) => {
  return PostModel.count({
    include: {
      model: UserModel,
      where: { username },
      attributes: ["username"],
      as: "user",
    },
  });
};

// This function gets the profile post of the user.
exports.getProfilePost = async (username) => {
  if (!username) throw returnError("username", "username not provided");
  const posts = await PostModel.findAll({
    attributes: {
      exclude: ["updatedAt", "deletedAt"],
      include: [
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM "postLikes" AS plikes WHERE plikes."postId" = "post".id)`
          ),
          "likes",
        ],
      ],
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: PostLikesModel,
        attributes: [],
      },
      {
        model: UserModel,
        as: "user",
        where: {
          username,
        },
        attributes: ["username", "id"],
      },
      {
        model: PostPhotoModel,
        as: "photos",
        where: {
          isCover: true,
        },
      },
    ],
  });

  //break up new posts into parts or its category
  let newPost = profileHelpers.parsePosts(posts);

  return {
    count: 0,
    cursor: null,
    hasNext: false,
    items: newPost,
  };
};

exports.updateProfilePhoto = async ({ id, publicId, photo }) => {
  try {
    // 1. if there is a updated images.
    if (!photo) throw returnError("image", "updated image not provided");
    // - upload the image to cloudinary

    const uploadedPhoto = await photoServices.uploadProfilePhoto(photo);

    // - delete the image from cloudinary
    if (publicId) {
      const deletedPhoto = await photoServices.deleteCoverPhoto(publicId);
    }
    // - save url, securedUrl, publicId to databaase via profilephoto id
    const updateResult = await ProfilePhotoModel.update(uploadedPhoto, {
      where: {
        id,
      },
    });

    console.log("Profile Update Result", updateResult);
    console.log("Profile Uploaded photo", uploadedPhoto);

    return {
      data: {
        photo: { id, ...uploadedPhoto },
        message: "profile photo successfully uploaded",
      },
    };
  } catch (error) {
    console.log(error);
    throw { error: "Something wrong with server" };
  }
};

exports.updateCoverPhoto = async ({ id, publicId, photo }) => {
  try {
    // 1. if there is a updated images.
    if (!photo) throw returnError("image", "updated image not provided");
    // - upload the image to cloudinary

    const uploadedPhoto = await photoServices.uploadCoverPhoto(photo);

    // - delete the image from cloudinary
    if (publicId) {
      const deletedPhoto = await photoServices.deleteCoverPhoto(publicId);
    }
    // - save url, securedUrl, publicId to databaase via profilephoto id
    const updateResult = await CoverPhotoModel.update(uploadedPhoto, {
      where: {
        id,
      },
    });

    return {
      data: {
        photo: { id, ...uploadedPhoto },
        message: "profile photo successfully uploaded",
      },
    };
  } catch (error) {
    console.log(error);
    throw { error: "Something wrong with server" };
  }
};

exports.removeProfilePhoto = async ({ id, publicId }) => {
  /* 
  1. check the id and publicId if not null
  2. remove it from database 
  3. remove it from cloudinary
  */
  try {
    if (!id) throw returnError("ids ", "id of image not provided");

    // - delete the image from cloudinary
    if (publicId) {
      const deletedPhoto = await photoServices.deleteProfilePhoto(publicId);
    } // - save url, securedUrl, publicId to databaase via profilephoto id

    const updateResult = await ProfilePhotoModel.update(
      {
        url: "",
        publicId: "",
        securedUrl: "",
      },
      {
        where: {
          id,
        },
      }
    );

    return {
      data: true,
      message: "profile photo deleted",
    };
  } catch (error) {
    console.log(error);
    throw { error: "Something wrong with server" };
  }
};

exports.removeCoverPhoto = async ({ id, publicId }) => {
  /* 
  
    1. check the id and publicId if not null
    2. remove it from database 
    3. remove it from cloudinary
  */
  try {
    if (!id) throw returnError("id ", "id of image not provided");

    // - delete the image from cloudinary
    if (publicId) {
      const deletedPhoto = await photoServices.deleteCoverPhoto(publicId);
    }
    // - save url, securedUrl, publicId to databaase via profilephoto id
    const updateResult = await CoverPhotoModel.update(
      {
        url: "",
        publicId: "",
        securedUrl: "",
      },
      {
        where: {
          id,
        },
      }
    );

    return {
      data: true,
      message: "cover photo deleted",
    };
  } catch (error) {
    console.log(error);
    throw { error: "Something wrong with server" };
  }
};
