/* eslint-disable no-unused-vars */
const express = require("express");
const routerSaved = express.Router();
const { SavedControllers } = require("../controllers/savedRecipe");
const multer = require("multer");
const upload = multer();
const { protect } = require("../middlewares/auth");

routerSaved.get("/", protect, SavedControllers.get);
routerSaved.delete("/:id", protect, SavedControllers.deletes);
routerSaved.post("/", protect, upload.array(), SavedControllers.insert);

module.exports = routerSaved;
