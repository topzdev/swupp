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

exports.getGeneralInfo = async (req, res) => {
  try {
    const id = req.session.userId;
    const data = await userService.getGeneralInfo(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.session.userId;
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const data = await userService.changePassword({
      id,
      currentPassword,
      newPassword,
      confirmPassword,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const id = req.session.userId;
    const { email } = req.body;
    const data = await userService.changeEmail({ id, email });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = req.session.userId;
    const data = await userService.deactivate({ id });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.changeUsername = async (req, res) => {
  try {
    const { username } = req.body;
    const id = req.session.userId;
    console.log("Change username");
    const data = await userService.changeUsername({ id, username });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.changeAccountInfo = async (req, res) => {
  try {
    const id = req.session.userId;
    const { firstname, lastname, birthdate } = req.body;
    const data = await userService.changeAccountInfo({
      id,
      firstname,
      lastname,
      birthdate,
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
