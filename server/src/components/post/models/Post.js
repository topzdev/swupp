const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Post = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.STRING,
    },
    conditionId: {
      type: DataTypes.STRING,
    },
    prefered: {
      type: DataTypes.STRING,
    },
    isDraft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isPriceHidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true, paranoid: true }
);

module.exports = Post;
