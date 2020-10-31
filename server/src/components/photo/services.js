const returnError = require("../../utils/returnError");
const photoHelpers = require("./helpers");

exports.uploadPostPhoto = async (postId, photos) => {
  if (!photos.length) return returnError("photos", "Photo is not provided");

  const result = await photoHelpers.multiUploadToCloud("post", photos);
  return {
    data: result,
    message: "Photo successfully uploaded",
  };
};

exports.uploadProfilePhoto = async (profileId, photo) => {
  if (!photo) return returnError("photo", "Photo is not provided");

  if (Array.isArray(photo)) throw { error: "Expecting single photo only" };

  const result = await photoHelpers.singleUploadToCloud("profile", photo);
  return {
    data: result,
    message: "Profile photo successfully uploaded",
  };
};
