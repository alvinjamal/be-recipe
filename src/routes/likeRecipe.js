/* eslint-disable no-unused-vars */
const express = require("express");
const routerLiked = express.Router();
const { LikeController } = require("../controllers/likerecipe");
const multer = require("multer");
const upload = multer();
const { protect } = require("../middlewares/auth");

routerLiked.get("/", protect, LikeController.get);
routerLiked.delete("/:id", protect, LikeController.deleteS);
routerLiked.post("/", protect, upload.array(), LikeController.insert);

module.exports = routerLiked;
