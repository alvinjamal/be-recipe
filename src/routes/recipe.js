const express = require("express");
const router = express.Router();
const { recipeControllers } = require("../controllers/recipe");
const upload = require("../middlewares/upload");

router.post("/add-Recipe", upload.single("photo"), recipeControllers.addRecipe);
router.get("/", recipeControllers.getRecipe);
router.get("/:id_recipe", recipeControllers.getDetailRecipe);

module.exports = router;
