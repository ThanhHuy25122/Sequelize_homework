const express = require("express");
const resRouter = express.Router();

const { getRestaurant } = require("../controllers/restaurantController");

// tạo API
resRouter.get("/get-res", getRestaurant);

resRouter.get("/get-res/:resId", getRestaurant);

module.exports = resRouter;
