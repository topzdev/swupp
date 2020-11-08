const returnError = require("../../utils/returnError");
const photoHelpers = require("./helpers");
const PostPhotoModel = require("../post/models/PostPhoto");
const Op = require("sequelize").Op;

exports.uploadPostPhotos = async (postId, photos) => {
  console.log("Validating photos...");
  if (!photos.length) return returnError("photos", "Photo is not provided");

  console.log("Uploding photos to cloudinary...");
  let photoResult = await photoHelpers.bulkUploadToCloud(
    "post",
    photos.map((item) => item.photo)
  );

  // add error handling here..
  console.log("Get all photo result to be save to db...");
  photoResult = photoResult.map((item, idx) => {
    const { isCover, caption } = photos[idx];
    return { ...item, isCover: isCover, caption: caption, postId };
  });

  return photoResult;
};

exports.deletePostPhotos = async (publicIds) => {
  if (!publicIds || !publicIds.length)
    throw returnError("photo", "Public ids are not supplied");

  console.log("Deleting photos from cloudinary...");
  const photoResult = await photoHelpers.bulkDeleteToCloud(publicIds);

  console.log("Delete Photo: ", photoResult);

  return photoResult;
};

exports.uploadProfilePhoto = async (profileId, photo, options) => {
  if (!photo) return returnError("photo", "Photo is not provided");

  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };

  const result = await photoHelpers.singleUploadToCloud("profile", photo);
  return {
    data: result,
    message: "Profile photo successfully uploaded",
  };
};
