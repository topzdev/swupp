const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Post = sequelize.define(
  "postSaves",
  {
    userId: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { timestamps: false, freezeTableName: true, paranoid: true }
);

module.exports = Post;
