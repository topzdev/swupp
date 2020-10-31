const photoServices = require("./services");

exports.testUpload = async (req, res) => {
  try {
    const photos = req.files.photo;
    console.log("Hello Test", photos);
    const result = await photoServices.uploadProfilePhoto("1", photos);
    console.log("Done");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
