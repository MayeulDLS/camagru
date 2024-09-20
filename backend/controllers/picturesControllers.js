const {
    getPictures,
    postPicture,
} = require("../services/picturesServices")

const getPicturesController = async (req, res) => {
    try {
        const result = await getPictures();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send({ message: error.message });
    }
};

const postPictureController = async (req, res) => {
    try {
        const imageData = req.body.image;

        if (!imageData) {
            return res.status(400).send({ message: "File is missing" });
        }
        
        const result = await postPicture(req.user.id, imageData);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getPicturesController,
    postPictureController,
}