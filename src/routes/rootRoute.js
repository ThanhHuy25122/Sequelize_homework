const express = require("express");
const rootRouter = express.Router();

const userRouter = require("./userRoute");
const foodRouter = require("./foodRoute");

rootRouter.use("/user", userRouter);

rootRouter.use("/food", foodRouter);

module.exports = rootRouter;
