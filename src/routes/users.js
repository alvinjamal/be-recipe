const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");
const { user } = require("../middlewares/user");
const upload = require("../middlewares/upload-video");
const { protect } = require("../middlewares/auth");
const { validate } = require("../helpers/users");

// AUTH
router.post("/register", UsersController.registerUsers);
router.post("/login", UsersController.login);
router.post("/verification", UsersController.verificationOtp);
router.post("/forgot", UsersController.forgotPassword);
router.post("/forgot/:token", UsersController.resetPassword);

router.put(
  "/update",
  protect,
  upload,
  UsersController.updatePhoto,
  function (req, res) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://food-recipe-alvinjamal.vercel.app"
    );
    res.header("Access-Control-Allow-Credentials", true);
  }
);
// GET
router.get("/", UsersController.getDataAll);
router.get("/profile", protect, UsersController.getProfile);
router.get("/:id_user", protect, UsersController.getDetail);

module.exports = router;
