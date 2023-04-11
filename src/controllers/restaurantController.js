const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

const getRestaurant = async (req, res) => {
  const resId = req.params.resId;
  if (!resId) {
    try {
      const dataUser = await model.restaurant.findAll();
      successCode(res, dataUser, "Get restaurant success");
    } catch (error) {
      failCode(res, "Internal server error");
    }
  } else {
    try {
      // lấy danh sách like theo restaurant

      const likes = await model.restaurant.findOne({
        where: { res_id: resId },
        include: [
          {
            model: model.like_res,
            as: "like_res",
            attributes: ["user_id", "date_like"],
            include: [
              {
                model: model.user,
                as: "user",
                attributes: ["full_name", "email"],
              },
            ],
          },
          {
            model: model.rate_res,
            as: "rate_res",
            include: [
              {
                model: model.user,
                as: "user",
                attributes: ["full_name", "email"],
              },
            ],
          },
        ],
      });

      successCode(res, likes, "Get restaurant success");
    } catch (err) {
      failCode(res, "Internal server error");
    }
  }
};

module.exports = {
  getRestaurant,
};
