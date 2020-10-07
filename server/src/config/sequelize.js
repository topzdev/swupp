const { Sequelize } = require("sequelize");
const { DB_PASSWORD, DB_USERNAME } = require("../constants");

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  database: "swup-dev",
  username: DB_USERNAME,
  password: DB_PASSWORD,
});

module.exports = sequelize;
