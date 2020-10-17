const argon = require("argon2");
const jwt = require("jsonwebtoken");
const ms = require("ms");
const { JWT_SECRET } = require("../../constants");

exports.hashPassword = (password) => {
  return argon.hash(password);
};

exports.verifyPassword = (password, hashedPassword) => {
  return argon.verify(hashedPassword, password);
};

exports.signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: ms("1w") });
};

// https://dev.to/nathilia_pierce/how-to-process-passwords-as-a-software-developer-3dkh

exports.validatePassword = (password, username) => {
  // check the password minimum length
  if (password.length <= 8) {
    return {
      error: "password is to short, the minimum is 8.",
    };
  }

  //   check the password maximumm length
  if (password.length >= 128) {
    return {
      error: "password is to long, the maximum is 128",
    };
  }

  //   check if the password contains username
  if (password.toLowerCase().includes(username.toLowerCase()))
    return {
      error:
        "we cannot accept your password because its contains your username",
    };

  return false;
};

exports.validateUsername = (username) => {
  if (username.length < 6)
    return {
      error: "username is too short, minimum is 6 character",
    };

  if (username.length > 15)
    return {
      error: "username is too long, maximum is 15 character",
    };

  if (/\s/.test(username))
    return {
      error: "username cannot have whitespace",
    };

  return false;
};
