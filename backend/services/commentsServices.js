const Comment = require("../models/commentModel");
const Picture = require("../models/picturesModel");
const User = require("../models/usersModel");
const { sendEmail } = require("../utils/sendMail");

const postComment = async (userId, pictureId, comment) => {
    try {
        const newComment = new Comment({
            user: userId,
            picture: pictureId,
            content: comment
        });

        const res = await newComment.save();

        if (res) {

            const picture = await Picture.findById(pictureId);
            if (!picture) {
                throw new Error("Picture not found");
            }

            const user = await User.findById(picture.user);

            if (!user) {
                throw new Error("User not found to send mail");
            }

            if (user.commentNotification) {
                sendEmail(user.email, "A new comment has been posted !", "A user has commented your picture.");
            }
        }

        return res;

    } catch (error) {
        throw error;
    }
};

const getComments = async (pictureId) => {
    try {
        const comments = await Comment.find({ picture: pictureId }).sort({ createdAt: -1 });

        if (!comments) {
            throw new Error("Error while getting comments");
        }

        return comments;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    postComment,
    getComments,
};