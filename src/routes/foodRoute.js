const express = require('express');
const foodRouter = express.Router();

const { getFood, createFood, updateFood, removeFood } = require('../controllers/foodController');

// tạo API 
// API get food
foodRouter.get("/get-food", getFood);

// API create food
foodRouter.post("/create-food", createFood);

// API update food
foodRouter.put("/update-food/:food_id", updateFood);

// API delete food
foodRouter.put("/remove-food/:food_id", removeFood);

module.exports = foodRouter;