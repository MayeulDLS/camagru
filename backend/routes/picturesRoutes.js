const express = require("express");
const router = express.Router();
const {
    getPicturesController,
    postPictureController,
    getNumberOfPicturesController,
} = require("../controllers/picturesControllers");

router.get("/", getPicturesController);
router.get("/total", getNumberOfPicturesController);
router.post("/", postPictureController);

module.exports = router;