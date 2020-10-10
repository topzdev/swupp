const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Profile = sequelize.define(
  "profile",
  {
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    profilePhotoId: { type: DataTypes.STRING },
    coverPhotoId: { type: DataTypes.STRING },
    birthdate: { type: DataTypes.DATEONLY },
    twitterUrl: { type: DataTypes.STRING },
    fbUrl: { type: DataTypes.STRING },
    instaUrl: { type: DataTypes.STRING },
    websiteUrl: { type: DataTypes.STRING },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Profile;
