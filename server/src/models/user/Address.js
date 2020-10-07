const { DataTypes } = require("sequelize");
const sequelize = require("../../config/sequelize");

const Address = sequelize.define(
  "Address",
  {
    fullname: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    postalCode: DataTypes.STRING,
    province: DataTypes.STRING,
    region: DataTypes.STRING,
    city: DataTypes.STRING,
    barangay: DataTypes.STRING,
    buildingNo: DataTypes.STRING,
    isDefaultAddress: Boolean,
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Address;
