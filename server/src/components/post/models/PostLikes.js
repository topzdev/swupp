const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Post = sequelize.define(
  "postLikes",
  {},
  { timestamps: true, freezeTableName: true, paranoid: false }
);

module.exports = Post;
