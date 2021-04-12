const User = require("../user/models/User");
const ProfileModel = require("../profile/models/Profile");
const { Op } = require("sequelize");
const authHelpers = require("./helpers");
const returnError = require("../../utils/returnError");
const sequelize = require("../../config/sequelize");
const ProfilePhoto = require("../profile/models/ProfilePhoto");
const CoverPhoto = require("../profile/models/CoverPhoto");
const ProfilePhotoModel = require("../profile/models/ProfilePhoto");
const CoverPhotoModel = require("../profile/models/CoverPhoto");
const jwt = require("jsonwebtoken");
const { EMAIL_SECRET, BASE_URL } = require("../../constants");
const transporter = require("../../config/transporter");
const emailConfirmationEmai = require("../../templates/emailConfirmationEmai");
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
  //Checks if the username has already been used or it already existed
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
        coverPhoto: {
          url: null,
          securedUrl: null,
          publicId: null,
        },
        profilePhoto: {
          url: null,
          securedUrl: null,
          publicId: null,
        },
      },
    },
    {
      include: {
        model: ProfileModel,
        include: [{ model: ProfilePhoto }, { model: CoverPhoto }],
      },
    }
  );

  /* tokenized user */
  // const token = authHelpers.signToken(user.id);

  const emailToken = jwt.sign(
    {
      id: user.id,
    },
    EMAIL_SECRET,
    {
      expiresIn: "1d",
    },
    (err, emailToken) => {
      if (err) return console.log(err);

      const url = `${BASE_URL}/confirmation/${emailToken}`;
      transporter.sendMail({
        to: user.email,
        subject: "Confirm Email",
        html: emailConfirmationEmai({
          firstname: user.username,
          email: user.email,
          link: url,
        }),
      });
    }
  );

  return {
    registered: true,
  };
};

exports.confirmEmail = async (token) => {
  console.log("Service token", token);

  try {
    const { id } = await jwt.verify(token, EMAIL_SECRET);
    await User.update({ confirmed: true }, { where: { id } });
    return {
      verified: true,
    };
  } catch (error) {
    console.log(error);
    return returnError("token", "Token is not acceptable");
  }
};

//This function allows to sign in to their accounts using their email and password
exports.signIn = async ({ usernameOrEmail, password, rememberMe }) => {
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });

  //checks if the username or email is valid
  if (!user) return returnError("usernameOrEmail", "User not exist");

  if (!user.confirmed)
    return returnError("password", "User email is not yet confirmed");

  //checks the if the password is mathched to the users password
  if (!(await authHelpers.verifyPassword(password, user.password)))
    return returnError("password", "password not match");

  const token = authHelpers.signToken(user.id);

  return {
    data: {
      token,
    },
  };
};

// content of the profile of the user.
exports.me = async (userId) => {
  if (!userId) return null;

  let user = await User.findByPk(userId, {
    attributes: { exclude: ["password"] },
    include: [
      {
        model: ProfileModel,
        attributes: ["firstname", "lastname"],
        as: "profile",
        include: [
          {
            model: CoverPhotoModel,
            attributes: ["url", "securedUrl", "publicId"],
            as: "coverPhoto",
          },
          {
            model: ProfilePhotoModel,
            attributes: ["url", "securedUrl", "publicId"],
            as: "profilePhoto",
          },
        ],
      },
    ],
  });

  console.log("User", user);

  return {
    data: {
      user,
    },
  };
};

// This function verifies the transaction using password
exports.transactVerify = async ({ id, password }) => {
  const user = await User.findByPk(id, { attributes: ["password"] });

  if (!(await authHelpers.verifyPassword(password, user.password)))
    return false;

  return true;
};
//Logouts the account of the user
exports.logout = async (req) => {};
