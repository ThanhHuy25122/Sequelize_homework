require("dotenv").config();

// yarn add dotenv

module.exports = {
  host: process.env.DB_HOST,
  userName: process.env.DB_USERNAME,
  pass: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  database: process.env.DB_DATABASE,
};
