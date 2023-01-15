const express = require("express");
const router = express.Router();
const { recipeControllers } = require("../controllers/recipe");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router.post("/add-recipe", upload.single("photo"), recipeControllers.addRecipe);
router.get("/", protect, recipeControllers.getRecipe);
router.get("/:id_recipe", recipeControllers.getDetailById);
router.get("/:id_user", recipeControllers.getRecipeUser);
router.delete("/:id_recipe", recipeControllers.delete);

module.exports = router;
