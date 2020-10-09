const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const User = sequelize.define(
  "User",
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
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = User;
