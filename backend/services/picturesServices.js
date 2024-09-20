const Picture = require("../models/picturesModel");
const User = require("../models/usersModel");
const cloudinary = require("cloudinary").v2;

const getPictures = async () => {
    const pictures = await Picture.find();

    return pictures;
}

const postPicture = async (id, imageData) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("No user for this id");
        }

        const result = await cloudinary.uploader.upload(imageData);

        const newPic = new Picture({
            user: id,
            imgUrl: result.secure_url
        });
    
        await newPic.save();

        return newPic;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPictures,
    postPicture,
}