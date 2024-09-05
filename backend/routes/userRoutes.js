const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    getUserController,
    updateEmailController,
    updateUsernameController,
    updatePasswordController,
} = require("../controllers/userControllers");

router.get("/", getUserController);
router.put("/email", updateEmailController);
router.put("/username", updateUsernameController);
router.put("/password", updatePasswordController);

module.exports = router;