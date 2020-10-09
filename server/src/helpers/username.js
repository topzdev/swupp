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
