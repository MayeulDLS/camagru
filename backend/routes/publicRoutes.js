const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createUserController,
    loginController,
    verifyController,
    resetPasswordEmailController,
    resetPasswordController,
} = require("../controllers/userControllers");

router.post("/createuser", createUserController);
router.post("/login", loginController);
router.get("/verification", verifyController);
router.post("/resetpasswordemail", resetPasswordEmailController);
router.put("/resetpassword", authMiddleware, resetPasswordController);

module.exports = router;