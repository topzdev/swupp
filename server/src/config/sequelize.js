const { Sequelize } = require("sequelize");
const {
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME,
  DB_HOST,
  DB_DIALECT,
  __prod__,
} = require("../constants");

const sequelize = __prod__
  ? new Sequelize(process.env.DATABASE_URL)
  : new Sequelize({
      host: DB_HOST,
      dialect: DB_DIALECT,
      database: DB_NAME,
      username: DB_USERNAME,
      password: DB_PASSWORD,
    });

module.exports = sequelize;
