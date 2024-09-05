const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getUserController,
    createUserController,
    loginController,
    updateEmailController,
    updateUsernameController,
    updatePasswordController,
} = require("../controllers/userControllers");

router.get("/getuser", authMiddleware, getUserController);
router.put("/updateemail", authMiddleware, updateEmailController);
router.put("/updateusername", authMiddleware, updateUsernameController);
router.put("/updatepassword", authMiddleware, updatePasswordController);
router.post("/createuser", createUserController);
router.post("/login", loginController);

module.exports = router;