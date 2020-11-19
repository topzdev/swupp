const ProfileModel = require("./models/Profile");
const ProfilePhoto = require("./models/ProfilePhoto");
const UserModel = require("../user/models/User");
const CoverPhoto = require("./models/CoverPhoto");
const PostModel = require("../post/models/Post");
const returnError = require("../../utils/returnError");
const Sequelize = require("sequelize");
const sequelize = require("../../config/sequelize");
const photoServices = require("../photo/services");
const PostPhotoModel = require("../post/models/PostPhoto");
const ProfilePhotoModel = require("./models/ProfilePhoto");
const CoverPhotoModel = require("./models/CoverPhoto");

exports.getProfileAbout = async (username) => {
  if (!username) throw returnError("username", "username not provided");

  let data = await ProfileModel.findOne({
    attributes: ["fbUrl", "instaUrl", "websiteUrl", "twitterUrl", "birthdate"],
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

exports.getProfile = async (username) => {
  if (!username) throw returnError("username", "username not provided");
  const data = await ProfileModel.findOne({
    attributes: [
      "firstname",
      "lastname",
      [
        Sequelize.literal(
          `(SELECT COUNT(*) FROM "post" AS postcount WHERE postcount."userId" = "user".id)`
        ),
        "postCount",
      ],
    ],

    include: [
      {
        model: UserModel,
        where: { username },
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

  if (!data) throw returnError("profile", "profile not exist");

  return data;
};

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

exports.getProfilePost = async (username) => {
  if (!username) throw returnError("username", "username not provided");
  const posts = await PostModel.findAll({
    attributes: {
      exclude: ["updatedAt", "deletedAt"],
    },
    order: [["createdAt", "DESC"]],
    include: [
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

  let newPost = JSON.parse(JSON.stringify(posts));

  newPost = newPost.map((item) => {
    const coverPhoto = item.photos[0];
    delete item.photos;

    return {
      ...item,
      price: item.isPriceHidden ? "$$$" : 0,
      coverPhoto,
      counts: { comments: 0, views: 0 },
    };
  });
  console.log(newPost);

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
