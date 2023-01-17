const express = require("express");
const router = express.Router();
const UsersRouter = require("./users");
const RecipeRouter = require("./recipe");
const CommentRouter = require("./comment");
const LikeRouter = require("./likeRecipe");
const SaveRouter = require("./savedRecipe");
const Profile = require("./profile");

router.use("/users", UsersRouter);
router.use("/recipe", RecipeRouter);
router.use("/comment", CommentRouter);
router.use("/like", LikeRouter);
router.use("/save", SaveRouter);
router.use("/profile", Profile);

module.exports = router;
