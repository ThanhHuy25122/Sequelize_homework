const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

const getUser = async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    try {
      const dataUser = await model.user.findAll();
      successCode(res, dataUser, "Get user success");
    } catch (error) {
      failCode(res, "Lỗi BE");
    }
  } else {
    try {
      // lấy danh sách like theo user

      const dataUser = await model.user.findOne({
        where: { user_id: userId },
        include: [
          {
            model: model.like_res,
            as: "like_res",
            include: {
              model: model.restaurant,
              as: "res",
            },
          },
          {
            model: model.rate_res,
            as: "rate_res",
            include: {
              model: model.restaurant,
              as: "res",
            },
          },
        ],
      });

      successCode(res, dataUser, "Get data user success");
    } catch (err) {
      console.error(err);
      failCode(res, "Internal server error");
    }
  }
};

const createUser = (req, res) => {
  res.send("create user");
};

//commonjs
module.exports = {
  getUser,
  createUser,
};
