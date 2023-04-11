const { Op } = require("sequelize");
const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

const getLike = async (req, res) => {
  const resId = req.params.resId;
  const userId = req.query.userId;

  try {
    // lấy danh sách like theo nhà hàng và user

    const likes = await model.like_res.findOne({
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
      attributes: ["date_like"],
    });

    successCode(res, likes, "Get liked success");
  } catch (err) {
    console.error(err);
    failCode(res, "Internal server error");
  }
};

const handleLike = async (req, res) => {
  const resId = req.query.resId;
  const userId = req.query.userId;

  try {
    // Kiểm tra xem user đã like bài viết này chưa
    const likedPost = await model.like_res.findOne({
      where: { res_id: resId, user_id: userId },
    });

    if (likedPost) {
      // Nếu đã like rồi thì xóa like
      await model.like_res.destroy({
        where: { res_id: resId, user_id: userId },
      });
      successCode(res, {}, "Unlike success");
    } else {
      // Nếu chưa like thì add like
      await model.like_res.create({
        res_id: resId,
        user_id: userId,
        date_like: Date.now(),
      });
      successCode(res, {}, "Like success");
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

module.exports = { getLike, handleLike };
