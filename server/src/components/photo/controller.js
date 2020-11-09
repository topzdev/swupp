const { parsePostData } = require("../post/helpers");
const photoServices = require("./services");

exports.testUpload = async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const data = parsePostData(files, body).photos;
    const response = await photoServices.uploadPostPhotos("1", data);
    console.log("Done", response);
    res.status(200).send("done");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
