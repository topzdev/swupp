const User = require("../user/models/User");
const Profile = require("../user/models/Profile");
const { Op } = require("sequelize");
const authHelpers = require("./helpers");
const returnError = require("../../utils/returnError");
const sequelize = require("../../config/sequelize");
// @ts-check

exports.signUp = async ({
  email,
  password,
  confirmPassword,
  firstname,
  lastname,
  phoneNumber,
  username,
  birthdate,
}) => {
  const isExist = await User.findOne({ where: { username } });

  if (isExist) {
    return returnError("username", "Username has been used");
  }
  console.log("Hello, Wolrd!!!!!");

  // validate  if the username is already in use, accepts 6-15 characters, no spacing on username
  const hasUsernameError = authHelpers.validateUsername(username);

  if (hasUsernameError) {
    return returnError("username", hasUsernameError.error);
  }

  // check the limitations in Password (8-12 characters alphanumeric, detects if the password is same sa namefield and username)
  const hasPassError = authHelpers.validatePassword(password, username);

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
  const hashedPassword = await authHelpers.hashPassword(password);

  /* saving the information user table and some field to profile table
        also use transaction from posgres to commit and rollback queires
     */

  const user = await User.create(
    {
      email,
      password: hashedPassword,
      phoneNumber,
      username,
      profile: {
        firstname,
        lastname,
        birthdate,
      },
    },
    { include: { model: Profile } }
  );

  console.log("User Created", user.toJSON());

  /* tokenized user */
  const token = authHelpers.signToken(user.id);

  return {
    data: {
      token,
    },
  };
};

exports.signIn = async ({ usernameOrEmail, password, rememberMe }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });

  if (!user) return returnError("usernameOrEmail", "User not exist");
  if (!(await authHelpers.verifyPassword(password, user.password)))
    return returnError("password", "password not match");

  const token = authHelpers.signToken(user.id);

  return {
    data: {
      token,
    },
  };
};

exports.me = async (userId) => {
  if (!userId) return null;

  console.log(userId);

  let user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: { model: Profile, attributes: ["firstname", "lastname"] },
  });

  return {
    data: {
      user,
    },
  };
};

exports.logout = async (req) => {};
