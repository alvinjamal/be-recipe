const express = require("express");
const router = express.Router();
const { recipeControllers } = require("../controllers/recipe");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router.post("/add-recipe", upload.single("photo"), recipeControllers.addRecipe);

// router.get("/all", recipeControllers.getAllRecipe);
router.get("/", protect, recipeControllers.getRecipe);
router.get("/:id_recipe", recipeControllers.getDetailById);

module.exports = router;
