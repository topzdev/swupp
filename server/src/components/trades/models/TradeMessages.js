const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Trades = sequelize.define(
  "tradeMessages",
  {
    text: {
      type: DataTypes.STRING,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Trades;
