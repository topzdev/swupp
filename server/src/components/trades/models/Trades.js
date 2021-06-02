const { DataTypes } = require("sequelize");
const sequelize = require("../../../config/sequelize");

const Trades = sequelize.define(
  "trades",
  {
    isTraded: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  { timestamps: true, freezeTableName: true }
);

module.exports = Trades;
