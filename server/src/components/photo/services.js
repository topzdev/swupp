const returnError = require("../../utils/returnError");
const photoHelpers = require("./helpers");
const PostPhotoModel = require("../post/models/PostPhoto");
const Op = require("sequelize").Op;

// Allows to upload post photos
exports.uploadPostPhotos = async (postId, photos) => {
  // If the uploaded photo is not efficient to the given length this will show the message below. 
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

// This function enables the user to delete the photos posted in your profile.
exports.deletePostPhotos = async (publicIds) => {
  if (!publicIds || !publicIds.length)
    throw returnError("photo", "Public ids are not supplied");
  //automatically deleted in the database
  const photoResult = await photoHelpers.bulkDeleteToCloud(publicIds);
  return photoResult;
};

// This function enables the user to upload their own profile photo.
exports.uploadProfilePhoto = async (photo) => {
  if (!photo) return returnError("photo", "Photo is not provided");
  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };
  let photoResult = await photoHelpers.singleUploadToCloud("profile", photo);

  return photoResult;
};
// This allows the user to remove or delete their profile photo
exports.deleteProfilePhoto = async (publicId) => {
  if (!publicId) throw returnError("photo", "Public ids are not supplied");
  const photoResult = await photoHelpers.singleDeleteToCloud(publicId);
  return photoResult;
};
// This function grants the user to upload their chosen cover photo
exports.uploadCoverPhoto = async (photo) => {
  if (!photo) return returnError("photo", "Photo is not provided");
  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };
  let photoResult = await photoHelpers.singleUploadToCloud("cover", photo);

  return photoResult;
};

// It enables the user to automatically delete their previous cover photo
exports.deleteCoverPhoto = async (publicId) => {
  if (!publicId) throw returnError("photo", "Public ids are not supplied");
  const photoResult = await photoHelpers.singleDeleteToCloud(publicId);
  return photoResult;
};
