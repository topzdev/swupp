const { Sequelize } = require("sequelize");
const {
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
} = require("../constants");

const sequelize = new Sequelize({
  host: DB_HOST,
  dialect: DB_DIALECT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
});

module.exports = sequelize;
