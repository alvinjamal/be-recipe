const express = require("express");
const router = express.Router();
const UsersRouter = require("../routes/users");
const RecipeRouter = require("../routes/recipe");

router.use("/users", UsersRouter);
router.use("/recipe", RecipeRouter);

module.exports = router;
