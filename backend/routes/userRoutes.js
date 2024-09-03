const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUsersController, createUserController, loginController } = require("../controllers/userControllers");

router.get("/getusers", authMiddleware, getUsersController);
router.post("/createuser", createUserController);
router.post("/login", loginController);

module.exports = router;