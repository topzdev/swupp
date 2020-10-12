const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Post = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(['']),
      allowNull: false,
    },
    qualityId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    conditionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prefered: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Post;
