const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Post = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER(2),
      defaultValue: 1,
    },
    qualityId: {
      type: DataTypes.INTEGER(2),
      defaultValue: 1,
    },
    conditionId: {
      type: DataTypes.INTEGER(2),
      defaultValue: 1,
    },
    prefered: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Post;
