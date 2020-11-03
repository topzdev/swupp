const returnError = require("../../utils/returnError");
const photoHelpers = require("./helpers");
const PostPhotoModel = require("../post/models/PostPhoto");

exports.uploadPostPhotos = async (postId, photos) => {
  if (!photos.length) return returnError("photos", "Photo is not provided");

  let photoResult = await photoHelpers.multiUploadToCloud(
    "post",
    photos.map((item) => item.photo)
  );

  // add error handling here..
  photoResult = photoResult.map((item, idx) => {
    const { isCover, caption } = photos[idx];
    return { ...item, isCover: isCover, caption: caption, postId };
  });

  const dbResult = await PostPhotoModel.bulkCreate(photoResult, {
    returning: true,
  });

  return {
    data: dbResult.map((item) => {
      const { id, publicId } = item.dataValues;
      return { id, publicId };
    }),
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
