const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

// truy vấn sub_food từ arr_sub_id không làm được . Nhờ mentor chỉ thêm cho em với ạ.

const getSubFoodsBySubIds = async (arr_sub_id) => {
  try {
    const subFoods = await model.sub_food.findAll({
      where: { id: arr_sub_id },
    });
    return subFoods;
  } catch (error) {
    console.log(error);
  }
};

const getOrderData = async (req, res) => {
  try {
    const orders = await model.order.findAll({
      include: ["user", "food"],
      attributes: ["amount", "code", "arr_sub_id"],
    });
    successCode(res, orders, "Get order success");
  } catch (error) {
    failCode(res, "Internal server error ");
  }
};

const createOrder = async (req, res) => {
  const { foodId, userId, amount, code, arrSubId } = req.body;
  const data = {
    food_id: foodId,
    user_id: userId,
    amount,
    code,
    arr_sub_id: arrSubId,
  };
  try {
    await model.order.create(data);
    successCode(res, data, "Create order success");
  } catch (error) {
    failCode(res, "Internal server error");
  }
};

module.exports = {
  getOrderData,
  createOrder,
};
