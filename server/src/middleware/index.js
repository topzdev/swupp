const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../constants");

exports.auth = (req, res, next) => {
  req.session.userId = 1;
  next();

  return;

  let token = req.headers["x-access-token"] || req.headers["authorization"];

  if (token && token.startsWith("Bearer "))
    token = token.slice(7, token.length);

  console.log("Token", token);

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log(decoded);
      req.session.userId = decoded.id;
      next();
    } catch (error) {
      return res.status(400).send("token is not valid");
    }
  } else {
    return res.status(401).send("Auth token is not supplied");
  }
};
