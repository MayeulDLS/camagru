const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const {
    postCommentController,
    getCommentsController,
} = require("../controllers/commentsControllers");

router.post("/", authMiddleware, postCommentController);
router.get("/:id", getCommentsController);

module.exports = router;