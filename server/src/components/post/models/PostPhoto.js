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
    caption: {
      type: DataTypes.STRING,
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCover: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true, paranoid: true }
);

module.exports = PostPhoto;
