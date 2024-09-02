const express = require("express");
const router = express.Router();
const { getUsersController, createUserController } = require("../controllers/userControllers");

router.get("/getusers", getUsersController);
router.post("/createuser", createUserController);

module.exports = router;