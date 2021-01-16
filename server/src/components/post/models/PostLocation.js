const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Post = sequelize.define(
  "postLocation",
  {
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    lng: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { timestamps: false, freezeTableName: true, paranoid: true }
);

module.exports = Post;
