const express = require("express");
const router = express.Router();
const {
    postPictureController,
} = require("../controllers/picturesControllers");

router.post("/", postPictureController);

module.exports = router;