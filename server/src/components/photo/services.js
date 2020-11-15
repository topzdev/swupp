const returnError = require("../../utils/returnError");
const photoHelpers = require("./helpers");
const PostPhotoModel = require("../post/models/PostPhoto");
const Op = require("sequelize").Op;

exports.uploadPostPhotos = async (postId, photos) => {
  if (!photos.length) return returnError("photos", "Photo is not provided");

  let photoResult = await photoHelpers.bulkUploadToCloud(
    "post",
    photos.map((item) => item.photo)
  );

  // add error handling here..
  photoResult = photoResult.map((item, idx) => {
    const { isCover, caption } = photos[idx];
    return { ...item, isCover: isCover, caption: caption, postId };
  });

  return photoResult;
};

exports.deletePostPhotos = async (publicIds) => {
  if (!publicIds || !publicIds.length)
    throw returnError("photo", "Public ids are not supplied");
  const photoResult = await photoHelpers.bulkDeleteToCloud(publicIds);
  return photoResult;
};

exports.uploadProfilePhoto = async (photo) => {
  if (!photo) return returnError("photo", "Photo is not provided");
  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };
  let photoResult = await photoHelpers.singleUploadToCloud("profile", photo);

  return photoResult;
};

exports.deleteProfilePhoto = async (publicId) => {
  if (!publicId) throw returnError("photo", "Public ids are not supplied");
  const photoResult = await photoHelpers.singleDeleteToCloud(publicId);
  return photoResult;
};
exports.uploadCoverPhoto = async (photo) => {
  if (!photo) return returnError("photo", "Photo is not provided");
  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };
  let photoResult = await photoHelpers.singleUploadToCloud("cover", photo);

  return photoResult;
};

exports.deleteCoverPhoto = async (publicId) => {
  if (!publicId) throw returnError("photo", "Public ids are not supplied");
  const photoResult = await photoHelpers.singleDeleteToCloud(publicId);
  return photoResult;
};
