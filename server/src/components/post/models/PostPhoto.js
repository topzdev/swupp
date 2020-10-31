const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const PostPhoto = sequelize.define(
  "postPhoto",
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    securedUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = PostPhoto;
