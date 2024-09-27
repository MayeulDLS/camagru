const express = require("express");
const router = express.Router();
const {
    postPictureController,
    getPictureController,
    deletePictureController,
    likePictureController,
} = require("../controllers/picturesControllers");

router.post("/", postPictureController);
router.get("/:id", getPictureController);
router.put("/:id", likePictureController);
router.delete("/:id", deletePictureController);

module.exports = router;