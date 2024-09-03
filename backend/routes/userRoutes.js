const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUserController, createUserController, loginController } = require("../controllers/userControllers");

router.get("/getuser", authMiddleware, getUserController);
router.post("/createuser", createUserController);
router.post("/login", loginController);

module.exports = router;