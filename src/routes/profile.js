const express = require("express");
const { getProfie, getRecipebyProfile } = require("../controllers/profile");
const { protect } = require("../middlewares/auth");
const router = express.Router();

router
  .get("/", protect, getProfie)
  .get("/recipes", protect, getRecipebyProfile);

module.exports = router;
