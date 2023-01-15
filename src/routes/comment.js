/* eslint-disable no-unused-vars */
const express = require("express");
const routerComment = express.Router();
const { CommentController } = require("../controllers/comment");
const multer = require("multer");
const upload = multer();
const { protect } = require("../middlewares/auth");

routerComment.get("/", CommentController.getComment);
routerComment.get("/:recipe_id", CommentController.getCommentById);
routerComment.post(
  "/add-comment",
  protect,
  upload.array(),
  CommentController.insert
);

module.exports = routerComment;
