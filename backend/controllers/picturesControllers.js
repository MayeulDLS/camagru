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

        const base64Data = imageData.split(',')[1]; // Extraire la partie base64 de la Data URL
        // Calculer la taille de la chaîne base64 en octets
        const sizeInBytes = (base64Data.length * 3) / 4 - (base64Data.endsWith('==') ? 2 : base64Data.endsWith('=') ? 1 : 0);
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 Mo
        if (sizeInBytes > maxSizeInBytes) {
            return res.status(413).send({ message: "File too big, limit is 5MB" });
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