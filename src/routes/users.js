const express = require("express");
const router = express.Router();
const { UsersController } = require("../controllers/users");

router.post("/register", UsersController.registerUsers);
router.post("/login", UsersController.login);
router.post("/verificationOtp", UsersController.verificationOtp);
router.post("/forgotPassword", UsersController.forgotPassword);
router.post("/resetPassword", UsersController.resetPassword);
// router.get("/:email/:otp", UsersController.otp);

module.exports = router;
