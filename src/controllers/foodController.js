const { Op } = require("sequelize");
const iniModels = require("../models/init-models");
const sequelize = require("../models/index");

const { successCode, errorCode, failCode } = require("../config/response");
const model = iniModels(sequelize);

const getFood = async (req, res) => {
  try {
    let data = await model.food.findAll();

    successCode(res, data, "get food success");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const createFood = async (req, res) => {
  try {
    const { food_name, image, price, desc, type_id } = req.body;

    // INSERT INTO VALUES
    let newModel = {
      food_name,
      image,
      price,
      desc,
      type_id,
    };

    let data = await model.food.create(newModel);

    // console.log(data);

    successCode(res, newModel, "Food created");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

// UPDATE
const updateFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    const { food_name, image, price, desc, type_id } = req.body;

    let modelUpdate = { food_name, image, price, desc, type_id };
    await model.food.update(modelUpdate, { where: { food_id } });
    successCode(res, modelUpdate, "Food Updated");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

const removeFood = async (req, res) => {
  try {
    let { food_id } = req.params;
    await model.food.destroy({ where: { food_id } });
    successCode(res, "Food Removed");
  } catch (err) {
    failCode(res, "Lỗi BE");
  }
};

module.exports = { getFood, createFood, updateFood, removeFood };
