const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const CoverPhotoModel = sequelize.define(
  "coverPhoto",
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

module.exports = CoverPhotoModel;
