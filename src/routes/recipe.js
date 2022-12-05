const express = require("express");
const router = express.Router();
const { recipeController } = require("../controllers/recipe");
const upload = require("../middlewares/upload");

router.post("/addRecipe", upload.single("photo"), recipeController.addRecipe);

module.exports = router;
