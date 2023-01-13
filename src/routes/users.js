const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");
const { user } = require("../middlewares/user");
const upload = require("../middlewares/upload-video");

router.post("/register", UsersController.registerUsers);
router.post("/login", UsersController.login);
router.post("/verification", UsersController.verificationOtp);
router.post("/forgot", UsersController.forgotPassword);
router.post("/forgot/:token", UsersController.resetPassword);
router.put("/", user, upload, UsersController.updatePhoto);
router.get("/", UsersController.getDetailUsers);

module.exports = router;
