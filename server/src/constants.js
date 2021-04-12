const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(__dirname, "../" + process.env.NODE_ENV + ".env"),
});

exports.__prod__ = process.env.NODE_ENV === "production";
exports.PORT = process.env.PORT || 5000;
exports.DB_NAME = process.env.DB_NAME;
exports.DB_HOST = process.env.DB_HOST;
exports.DB_DIALECT = process.env.DB_DIALECT;
exports.DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_USERNAME = process.env.DB_USERNAME;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.COOKIE_NAME = process.env.COOKIE_NAME;
exports.SESSION_SECRET = process.env.SESSION_SECRET;
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
exports.CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;
exports.EMAIL_SECRET = process.env.BASE_URL;
exports.BASE_URL = process.env.BASE_URL;
