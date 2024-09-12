const express = require("express");
const router = express.Router();
const {
    createUserController,
    loginController,
    verifyController,
} = require("../controllers/userControllers");

router.post("/createuser", createUserController);
router.post("/login", loginController);
router.get("/verification", verifyController);

module.exports = router;