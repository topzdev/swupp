const AuthServices = require("./service");

const authService = new AuthServices();

exports.signUp = async (req, res) => {
  try {
    const input = req.body;
    console.log("Value", input);
    const data = await authService.signUp(input);

    if (data.error) return res.status(401).json(data);

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

    if (data.error) return res.status(401).json(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.signInV2 = async (req, res) => {
  try {
    const input = req.body;
    console.log(input);
    const data = await authService.signInV2(input);

    if (data.error) return res.status(401).json(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.confirmEmail = async (req, res) => {
  try {
    const token = req.params.token;
    console.log("Token", token);
    const data = await authService.confirmEmail(token);

    if (data.error) return res.json(data);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.me = async (req, res) => {
  try {
    const userId = req.session.userId;
    const data = await authService.me(userId);

    if (data.error) return res.status(400).json(data);

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

exports.logout = async (req, res) => {
  try {
    await authService.logout(req);
    res.status(200).json(data);
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

exports.transactVerifiy = async (req, res) => {
  try {
    const id = req.session.userId;
    const password = req.body.password;
    console.log(password, id);
    const data = await authService.transactVerify({ id, password });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
