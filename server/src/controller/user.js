const User = require("../models/user/User");
const argon = require("argon2");
const { validatePassword } = require("../helpers/password");
const returnError = require("../utils/returnError");
const Profile = require("../models/user/Profile");
const sequelize = require("../config/sequelize");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");
const ms = require("ms");
const { validateUsername } = require("../helpers/username");

exports.register = async (req, res) => {
  const t = await sequelize.transaction();
  const {
    email,
    password,
    confirmPassword,
    firstname,
    lastname,
    phoneNumber,
    username,
  } = req.body;

  console.log(req.body);

  try {
    const isExist = await User.findOne({ where: { username } });

    if (isExist) {
      return returnError("username", "Username has been used");
    }

    // validate  if the username is already in use, accepts 6-15 characters, no spacing on username
    const hasUsernameError = validateUsername(username);

    if (hasUsernameError) {
      return returnError("username", hasUsernameError.error);
    }

    // check the limitations in Password (8-12 characters alphanumeric, detects if the password is same sa namefield and username)
    const hasPassError = validatePassword(password, username);

    if (hasPassError) {
      return returnError("password", hasPassError.error);
    }

    // check if the given password match the confirmPassword provided.
    if (password !== confirmPassword) {
      return returnError(
        "confirmPassword",
        "Password not match with confirm password."
      );
    }

    // hashing the password for securiry
    const hashedPassword = argon.hash(password);

    /* saving the information user table and some field to profile table
        also use transaction from posgres to commit and rollback queires
     */
    const user = await User.create(
      { email, password: hashedPassword, phoneNumber, username },
      { transaction: t }
    );
    const profile = await Profile.create(
      { firstname, lastname, birthdate },
      { transaction: t }
    );

    await t.commit();

    /* tokenized user */
    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: ms("7d"),
    });

    return {
      data: {
        token,
      },
    };
  } catch (error) {
    await t.rollback();
    console.log(error);
    // throw Error(error);
  }
};
