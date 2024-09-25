const Picture = require("../models/picturesModel");
const User = require("../models/usersModel");
const cloudinary = require("cloudinary").v2;

const getPictures = async (page) => {
    const pictures = await Picture.find()
    .sort({ _id: -1 })
    .skip((page - 1) * 5)
    .limit(5);

    return pictures;
}

const getNumberOfPictures = async () => {
    
    const total = await Picture.countDocuments();

    return {total};
}

const postPicture = async (id, image) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("No user for this id");
        }

        const result = await cloudinary.uploader.upload(image);

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
    getNumberOfPictures,
}