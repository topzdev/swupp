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
