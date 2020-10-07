const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const UserReview = sequelize.define(
  "UserReview",
  {
    userId: String,
    star: { type: DataTypes.NUMBER, allowNull: false },
    criticId: String,
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = UserReview;
