const express = require("express");
const router = express.Router();
const {
    getUserController,
    updateEmailController,
    updateUsernameController,
    updatePasswordController,
    updateCommentNotificationController,
} = require("../controllers/userControllers");

router.get("/", getUserController);
router.put("/email", updateEmailController);
router.put("/username", updateUsernameController);
router.put("/password", updatePasswordController);
router.put("/commentNotification", updateCommentNotificationController);

module.exports = router;