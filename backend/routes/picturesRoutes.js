const express = require("express");
const router = express.Router();
const {
    postPictureController,
    getPictureController,
} = require("../controllers/picturesControllers");

router.post("/", postPictureController);
router.get("/:id", getPictureController);

module.exports = router;