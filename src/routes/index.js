const express = require("express");
const router = express.Router();
const UsersRouter = require("./users");
const RecipeRouter = require("./recipe");
// const Profile = require("./profile");

router.use("/users", UsersRouter);
router.use("/recipe", RecipeRouter);
// router.use("/profile", Profile);

module.exports = router;
