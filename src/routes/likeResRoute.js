const express = require("express");
const likeRouter = express.Router();

const { handleLike, getLike } = require("../controllers/likeResController");

// API get like
likeRouter.get("/like-res/:resId", getLike);

// API handle like
likeRouter.post("/like-res", handleLike);

module.exports = likeRouter;
