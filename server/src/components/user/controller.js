const userService = require("./service");

exports.checkUsernameOrEmailExist = async (req, res) => {
  try {
    const input = req.params.usernameOrEmail;
    console.log(input);
    const data = await userService.checkUsernameExist(input);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
