const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

exports.auth = (res, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer "))
    token = token.slice(7, token.length);

  console.log("Token" + token);

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      res.locals.user = decoded;
      next();
    } catch (error) {
      return validateResponse(res, {
        status: 400,
        msg: "Token is not valid",
        data: error,
      });
    }
  } else {
    return validateResponse(res, {
      status: 401,
      msg: "Auth token is not supplied",
    });
  }
};
