const express = require("express");
const orderRouter = express.Router();

const { getOrderData, createOrder } = require("../controllers/orderController");

orderRouter.get("/get-order", getOrderData);

orderRouter.post("/create-order", createOrder);

module.exports = orderRouter;
