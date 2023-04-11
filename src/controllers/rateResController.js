const { Op } = require("sequelize");
const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

const getRate = async (req, res) => {
  const resId = req.params.resId;
  const userId = req.query.userId;

  try {
    // lấy danh sách rate theo nhà hàng và user

    const rates = await model.rate_res.findOne({
      where: { res_id: resId, user_id: userId },
      include: [
        {
          model: model.restaurant,
          as: "res",
          attributes: ["res_name", "image", "desc"],
        },
        {
          model: model.user,
          as: "user",
          attributes: ["full_name", "email"],
        },
      ],
      attributes: ["date_rate"],
    });

    successCode(res, rates, "Get rated success");
  } catch (err) {
    console.error(err);
    failCode(res, "Internal server error");
  }
};

const handleRate = async (req, res) => {
  const resId = req.query.resId;
  const userId = req.query.userId;
  const { amount } = req.body;

  try {
    // Kiểm tra xem user đã rate bài viết này chưa
    const ratedPost = await model.rate_res.findOne({
      where: { res_id: resId, user_id: userId },
    });

    const dataRate = {
      res_id: resId,
      user_id: userId,
      amount: amount >= 5 ? 5 : amount,
      date_rate: new Date(),
    };

    if (ratedPost) {
      // Nếu đã rate rồi thì update rate
      if (amount > 0) {
        await model.rate_res.update(dataRate, {
          where: { res_id: resId, user_id: userId },
        });
        successCode(res, { dataRate }, "update rate success");
      } else {
        errorCode(res, { dataRate }, "Rate < 0");
      }
    } else {
      // Nếu chưa rate thì add rate
      if (amount > 0) {
        await model.rate_res.create({});
        successCode(res, { dataRate }, "Rate success");
      } else {
        errorCode(res, { dataRate }, "Rate < 0");
      }
    }
  } catch (err) {
    // Check user_id có trong table user không
    const userPost = await model.user.findOne({
      where: { user_id: userId },
    });

    // Check res_id có trong table restaurant không
    const resPost = await model.restaurant.findOne({
      where: { res_id: resId },
    });

    if (userPost && resPost) {
      failCode(res, "Lỗi BE");
    } else {
      if (!resPost) {
        errorCode(res, {}, "Sai restaurant id");
      }
      if (!userPost) {
        errorCode(res, {}, "Sai user id");
      }
    }
  }
};

module.exports = { getRate, handleRate };
