const express = require("express");
const rootRouter = express.Router();

const userRouter = require("./userRoute");
const foodRouter = require("./foodRoute");
const likeRouter = require("./likeResRoute");
const resRouter = require("./restaurantRoute");
const rateRouter = require("./rateResRoute");
const orderRouter = require("./orderRoute");

rootRouter.use("/user", userRouter);
rootRouter.use("/food", foodRouter);
rootRouter.use("/like", likeRouter);
rootRouter.use("/rate", rateRouter);
rootRouter.use("/res", resRouter);
rootRouter.use("/order", orderRouter);

module.exports = rootRouter;
