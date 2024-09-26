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

const getPicture = async (id) => {
    try {
        const picture = await Picture.findById(id);

        if (!picture) {
            throw new Error("No picture found for this id");
        }

        return picture;
        
    } catch (error) {
        throw error;
    }
}

const deletePicture = async (id, userId) => {
    try {

        const picture = await Picture.findById(id);
        if (!picture) {
            throw new Error("Picture not found")
        }
        if (userId !== picture.user) {
            throw new Error("You don't have the rights to delete this picture");
        }

        const picturePublicId = picture.imgUrl.split("/").pop().split(".")[0];

        cloudinary.uploader.destroy(picturePublicId);

        const deletedPicture = await Picture.findByIdAndDelete(id);
        if (!deletedPicture) {
            throw new Error("Error while deleting picture");
        }

        return { message: "Picture deleted" };

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getPictures,
    postPicture,
    getNumberOfPictures,
    getPicture,
    deletePicture,
}