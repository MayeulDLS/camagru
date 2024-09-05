const express = require("express");
const router = express.Router();
const {
    createUserController,
    loginController,
} = require("../controllers/userControllers");

router.post("/createuser", createUserController);
router.post("/login", loginController);

module.exports = router;