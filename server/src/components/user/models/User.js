const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recoveryEmail: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: DataTypes.STRING,
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
