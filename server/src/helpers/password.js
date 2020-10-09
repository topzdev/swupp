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
  if (this.passContainsUsername(password, username))
    return {
      error:
        "your password contains your other credentials such as email address",
    };

  return false;
};

exports.passContainsUsername = (password, username) => {
  return password
    .match(/[a-z]+/gi)
    .filter((a) => a.length > 4 && username.includes(a)).length > 0
    ? true
    : false;
};
