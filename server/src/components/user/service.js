const UserModel = require("../user/models/User");
const ProfileModel = require("../profile/models/Profile");
const { Op } = require("sequelize");
const retunError = require("../../utils/returnError");
const authHelpers = require("../auth/helpers");
const returnError = require("../../utils/returnError");


// Checks if the username or email is already taken or it already exist.
exports.checkUsernameExist = async (usernameOrEmail) => {
  const user = await UserModel.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });
  return user ? true : false;
};

 // Function that gets the user input or personal information of the user.
exports.getGeneralInfo = async (id) => {
  const user = await UserModel.findOne({
    where: { id },
    attributes: ["email", "username"],
    include: [
      {
        model: ProfileModel,
        attributes: ["firstname", "lastname", "birthdate"],
      },
    ],
  });

  console.log(user);

  return user;
};

// This function allows the user to change the current password to a new one.
exports.changePassword = async ({
  id,
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  // Checks if the user input matched the given username
  const user = await UserModel.findByPk(id, { plain: true });
  console.log("Change Passworkd", user);
  // If it is not matched with the given username it will show the message bellow
  if (!user) throw returnError("user", "user not exist");

  //Function that validates the username of tha user.
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

  //This function protects or hide your password so that it cant be leaked.
  const hashedPassword = await authHelpers.hashPassword(newPassword);

  // It updates the password of the user.
  const updatedUser = await UserModel.update(
    { password: hashedPassword },
    { where: { id } }
  );

  //Successfully updated the password.
  console.log("Updated User Password", updatedUser);
  return {
    data: {
      updated: true,
    },
  };
};

// This function allows the user to change it current email address to a new one or update it.
exports.changeEmail = async ({ id, email }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  //if the user input is not matched to an existing email it returns an error saying user not exist.
  if (!user) throw retunError("user", "user not exist");

  //while if the user input is matched to a certain or an existing email it proceeds to your email. 
  if (email === user.email)
    throw returnError("email", "this your current email address");

  // It checks if the email has already existed
  const isExist = await UserModel.findOne({
    where: { [Op.and]: [{ email: email }, { [Op.not]: { id } }] },
  });
  // if it finds one existing email it will show this message.
  if (isExist) throw returnError("email", "email address is already exist");

  // then it allows the user to update its email.
  const updateUser = await UserModel.update({ email }, { where: { id } });

  //Successfully updated the email address
  console.log("Update Email Address", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};

// This function allows the user to automatically deactive their own accounts.
exports.deactivate = async ({ id }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw retunError("user", "user not exist");

  //Update the status of the user to deactivated account
  const updateUser = await UserModel.update(
    { isActive: false },
    { where: { id } }
  );

  //Successfully Deactivated the account
  console.log("Account Deactivated");
  return {
    data: {
      deactivated: true,
    },
  };
};

// This function allows the user to activate their account
exports.activate = async ({ id }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  if (!user) throw returnError("user", "user not exist");

  const updateUser = await UserModel.update(
    { isActive: true },
    { where: { id } }
  );

  //Successfully Reactivated the account.
  console.log("Account Reactivate");
  return {
    data: {
      activated: true,
    },
  };
};

// This function changes or update the current username of the user to a new one.
exports.changeUsername = async ({ id, username }) => {
  const user = await UserModel.findByPk(id, { plain: true });

  // If the new username that the user input is the same as previous one it shows this message.
  if (username === user.username)
    throw returnError("email", "this your current username");

  //Finds if their is an existing username.
  const isExist = await UserModel.findOne({
    where: { [Op.and]: [{ username: username }, { [Op.not]: { id } }] },
  });

  //if it catches one this will return a message that the username is already exist
  if (isExist) throw returnError("username", "username is already exist");

  console.log("Change username", username, user);
  const hasUsernameError = authHelpers.validateUsername(username);

  if (hasUsernameError) {
    throw returnError("username", hasUsernameError.error);
  }
  
  //Updates the username
  const updateUser = await UserModel.update(
    {
      username,
    },
    { where: { id } }
  );

  //Successfully updated the username.
  console.log("Updated Username", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};

// This function allows the user to change it's account information
exports.changeAccountInfo = async ({ id, firstname, lastname, birthdate }) => {
  const user = await UserModel.findByPk(id, { plain: true });
 
  if (!user) throw retunError("user", "user not exist");

  const info = {};

  console.log("Update Profile Info", firstname, lastname);
  //changing the previous personal information to a new or updated one
  if (firstname) info.firstname = firstname;
  if (lastname) info.lastname = lastname;
  if (birthdate) info.birthdate = birthdate;

  console.log(info, id);
  const updateUser = await ProfileModel.update(info, { where: { userId: id } });

  //Successfully Change the account information
  console.log("Change Account Info", updateUser);

  return {
    data: {
      updated: true,
    },
  };
};
