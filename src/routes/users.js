const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");
const { user } = require("../middlewares/user");
const upload = require("../middlewares/upload");
const { protect } = require("../middlewares/auth");

router.get("/", UsersController.getDataAll);
// AUTH
router.post("/register", UsersController.registerUsers);
router.post("/login", UsersController.login);
router.post("/verification", UsersController.verificationOtp);
router.post("/forgot", UsersController.forgotPassword);
router.post("/forgot/:token", UsersController.resetPassword);
router.put(
  "/edit/",
  protect,
  upload.single("photo"),
  UsersController.updateUsers
);
// GET
router.get("/:id_user", UsersController.getDetail);
router.get("/profile", UsersController.getProfile);

module.exports = router;
