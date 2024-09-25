const { mergeImageAndFrame } = require("../utils/mergeImageAndFrame")
const {
    getPictures,
    postPicture,
    getNumberOfPictures,
} = require("../services/picturesServices")

const getPicturesController = async (req, res) => {
    const { page } = req.query;
    try {
        const result = await getPictures(page);
        res.status(200).send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send({ message: error.message });
    }
};

const getNumberOfPicturesController = async (req, res) => {
    try {
        const result = await getNumberOfPictures();
        res.status(200).send(result);
    } catch (error) {
        console.error("Error in User controller : ", error);
        res.status(500).send({ message: error.message });
    }
}

const postPictureController = async (req, res) => {
    try {
        const imageData = req.body.image;
        const frameUrl = req.body.frame;

        if (!imageData || !frameUrl) {
            return res.status(400).send({ message: "File or frame is missing" });
        }

        const base64Image = imageData.split(',')[1]; // Extraire la partie base64 de la Data URL

        // Calculer la taille de la chaîne base64 en octets
        const sizeInBytes = (base64Image.length * 3) / 4 - (base64Image.endsWith('==') ? 2 : base64Image.endsWith('=') ? 1 : 0);
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 Mo
        if (sizeInBytes > maxSizeInBytes) {
            return res.status(413).send({ message: "File too big, limit is 5MB" });
        }

        const mergedImage = await mergeImageAndFrame(base64Image, frameUrl);
        
        const result = await postPicture(req.user.id, mergedImage);

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {
    getPicturesController,
    postPictureController,
    getNumberOfPicturesController,
}