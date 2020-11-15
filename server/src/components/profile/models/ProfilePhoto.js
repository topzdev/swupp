const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const ProfilePhotoModel = sequelize.define(
  "profilePhoto",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    securedUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = ProfilePhotoModel;
