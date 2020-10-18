const { use } = require("./api");
const authService = require("./service");

exports.signUp = async (req, res) => {
  try {
    const input = req.body;
    const data = await authService.signUp(input);

    if (data.error) return res.status(200).json(data);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.signIn = async (req, res) => {
  try {
    const input = req.body;
    console.log(input);
    const data = await authService.signIn(input);

    if (data.error) return res.status(400).json(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.me = async (req, res) => {
  try {
    const userId = req.session.userId;
    console.log("User Id", userId);
    const data = await authService.me(userId);

    if (data.error) return res.status(400).json(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.logout = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};
exports.forgotPassword = async (req, res) => {
  try {
  } catch (error) {
    res.status(400).json(error);
  }
};
