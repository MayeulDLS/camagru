const express = require("express");
const router = express.Router();
const {
    postPictureController,
    getPictureController,
    deletePictureController,
} = require("../controllers/picturesControllers");

router.post("/", postPictureController);
router.get("/:id", getPictureController);
router.delete("/:id", deletePictureController);

module.exports = router;