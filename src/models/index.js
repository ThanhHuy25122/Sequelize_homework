// kết nối CSDL
const { Sequelize } = require("sequelize");

const {
  host,
  userName,
  pass,
  database,
  port,
  dialect,
} = require("../config/config");

const sequelize = new Sequelize(database, userName, pass, {
  host,
  port,
  dialect,
});
try {
  sequelize.authenticate();
  console.log("thanh cong");
} catch (error) {
  console.log("that bai", error);
}

module.exports = sequelize;
