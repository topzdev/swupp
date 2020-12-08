const UserModel = require("../user/models/User");
const { Op } = require("sequelize");
const retunError = require("../../utils/returnError");
const authHelpers = require("../auth/helpers");
const returnError = require("../../utils/returnError");
const Profile = require("../profile/models/Profile");

exports.checkUsernameExist = async (usernameOrEmail) => {
  const user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
  return user ? true : false;
};

exports.changePassword = async ({
  id,
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  const user = await UserModel.findByPk(id, { plain: true });
  console.log("Change Passworkd", user);
  if (!user) throw returnError("user", "user not exist");

  const hasUsernameError = authHelpers.validateUsername(user.username);

  if (hasUsernameError) {
    throw returnError("username", hasUsernameError.error);
  }

  // check the limitations in Password (8-12 characters alphanumeric, detects if the password is same sa namefield and username)
  const hasPassError = authHelpers.validatePassword(newPassword, user.username);

  if (hasPassError) {
    throw returnError("password", hasPassError.error);
  }

  if (!(await authHelpers.verifyPassword(currentPassword, user.password)))
    throw returnError(
      "password",
      "you enterted wrong password for you account"
    );

  if (!(confirmPassword === newPassword))
    throw retunError("passwords", "current password doenst match");

  const hashedPassword = await authHelpers.hashPassword(newPassword);

  const updatedUser = await UserModel.update(
    { password: hashedPassword },
    { where: { id } }
  );

  console.log("Updated User Password", updatedUser);
  return {
    data: {
      updated: true,
    },
  };
};

exports.changeEmail = async ({ id, email }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw retunError("user", "user not exist");

  const isExist = await UserModel.findOne({ where: { email } });

  if (isExist) throw returnError("email", "email address is already exist");

  const updateUser = await UserModel.update({ email }, { where: { id } });

  console.log("Update Email Address", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};

exports.deactivate = async ({ id }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw retunError("user", "user not exist");

  const updateUser = await UserModel.update(
    { isActive: false },
    { where: { id } }
  );

  console.log("Account Deactivated");
  return {
    data: {
      deactivated: true,
    },
  };
};

exports.changeUsername = async ({ id, username }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw retunError("user", "user not exist");
  console.log("Change username", username, user);
  const hasUsernameError = authHelpers.validateUsername(username);

  if (hasUsernameError) {
    throw returnError("username", hasUsernameError.error);
  }

  const updateUser = await UserModel.update(
    {
      username,
    },
    { where: { id } }
  );

  console.log("Updated Username", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};

exports.changeAccountInfo = async ({ id, firstname, lastname, birthdate }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw retunError("user", "user not exist");

  const info = {};

  console.log("Update Profile Info", firstname, lastname);

  if (firstname) info.firstname = firstname;
  if (lastname) info.lastname = lastname;
  if (birthdate) info.birthdate = birthdate;

  console.log(info, id);
  const updateUser = await Profile.update(info, { where: { userId: id } });

  console.log("Change Account Info", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};
