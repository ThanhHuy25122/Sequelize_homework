const express = require("express");
const rateRouter = express.Router();

const { handleRate, getRate } = require("../controllers/rateResController");

// API get rate
rateRouter.get("/rate-res/:resId", getRate);

// API handle rate
rateRouter.post("/rate-res", handleRate);

module.exports = rateRouter;
