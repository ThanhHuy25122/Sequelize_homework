const express = require("express");
const userRouter = express.Router();

const { getUser, createUser } = require("../controllers/userController");

// tạo API
userRouter.get("/get-user", getUser);

userRouter.get("/get-user/:userId", getUser);

userRouter.post("/create-user", createUser);

module.exports = userRouter;
