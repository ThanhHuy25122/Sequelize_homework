const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);
