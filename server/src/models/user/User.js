const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recoveryEmail: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    isReported: DataTypes.BOOLEAN,
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
