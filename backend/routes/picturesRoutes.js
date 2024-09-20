const express = require("express");
const router = express.Router();
const {
    getPicturesController,
    postPictureController,
} = require("../controllers/picturesControllers");

router.get("/", getPicturesController);
router.post("/", postPictureController);

module.exports = router;