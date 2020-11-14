const { parsePostData, parsePostUpdate } = require("./helpers");
const profileServices = require("./service");

exports.getProfile = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username);
    const data = await profileServices.getProfile(username);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getProfileAbout = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await profileServices.getProfileAbout(username);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.getProfilePost = async (req, res) => {
  try {
    const username = req.params.username;
    const data = await profileServices.getProfilePost(username);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
exports.updateProfilePhoto = async (req, res) => {
  try {
    const photo = req.files.photo;
    const { publicId, id } = req.body;

    const data = await profileServices.updateProfilePhoto({
      publicId,
      id,
      photo,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.updateCoverPhoto = async (req, res) => {
  try {
    const photo = req.files.photo;
    const { publicId, id } = req.body;

    const data = await profileServices.updateCoverPhoto({
      publicId,
      id,
      photo,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.removeProfilePhoto = async (req, res) => {
  try {
    const { publicId, id } = req.body;

    const data = await profileServices.removeProfilePhoto({
      publicId,
      id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.removeCoverPhoto = async (req, res) => {
  try {
    const { publicId, id } = req.body;

    const data = await profileServices.removeCoverPhoto({
      publicId,
      id,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
