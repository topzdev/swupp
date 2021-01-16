const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Post = sequelize.define(
  "postLikes",
  {},
  { timestamps: false, freezeTableName: true, paranoid: true }
);

module.exports = Post;
