const { CLOUDINARY_FOLDER } = require("../../constants");
const returnError = require("../../utils/returnError");

const cloudinary = require("cloudinary").v2;

const folders = {
  profile: `${CLOUDINARY_FOLDER}/profiles`,
  post: `${CLOUDINARY_FOLDER}/posts`,
};

const parseResult = (result) => {
  const { public_id, secure_url, url } = result;

  return {
    publicId: public_id,
    securedUrl: secure_url,
    url,
  };
};

const isValidWhere = (where) => {
  if (!where) return false;
  return folders[where] !== undefined;
};

exports.bulkUploadToCloud = (where, photos) => {
  if (!isValidWhere(where)) throw Error("Invalid folder to store");

  if (!photos.length) throw Error("No photo provided");

  console.log("Helpers", photos);

  return new Promise(async (resolve, reject) => {
    let photoLength = photos.length,
      uploadResponse = [];

    console.log("Length", photoLength);

    for (let i = 0; i <= photoLength - 1; i++) {
      let filePath = photos[i].tempFilePath;
      console.log(filePath);

      await cloudinary.uploader.upload(
        filePath,
        {
          folder: folders[where],
        },
        (error, result) => {
          if (error) return reject(error);

          console.log("Result", result);

          uploadResponse.push(parseResult(result));

          if (uploadResponse.length === photoLength)
            return resolve(uploadResponse);
        }
      );
    }
  })
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

exports.bulkDeleteToCloud = (publicIds) => {
  if (!publicIds || !publicIds.length) {
    throw returnError("photos", "recieved null or empty array of publicIDs");
  }

  return new Promise(async (resolve, reject) => {
    let publicIdsLength = publicIds.length,
      deleteResponse = [];
    for (let i = 0; i <= publicIdsLength - 1; i++) {
      await cloudinary.uploader.destroy(publicIds[i], (error, result) => {
        if (error) return reject(error);

        console.log("Bulk delete resukt", result);

        deleteResponse.push(result);

        if (deleteResponse.length === publicIdsLength) resolve(deleteResponse);
      });
    }
  })
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

exports.singleUploadToCloud = (where, photo) => {
  if (!isValidWhere(where)) return;

  if (!photo) throw Error("No photo provided");

  if (Array.isArray(photo))
    throw Error("Expecting single photo only, recieved multiple");

  return new Promise(async (resolve, reject) => {
    const filePath = photo.tempFilePath;
    await cloudinary.uploader.upload(
      filePath,
      {
        folder: folders[where],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(parseResult(result));
      }
    );
  })
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};

exports.singleDeleteToCloud = (publicId) => {
  if (!publicId) throw returnError("photo", "No publicId provided");

  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
  })
    .then((result) => result)
    .catch((error) => {
      throw error;
    });
};
