const Comment = require("../models/commentModel");

const postComment = async (userId, pictureId, comment) => {
    try {
        const newComment = new Comment({
            user: userId,
            picture: pictureId,
            content: comment
        });

        await newComment.save();

        return newComment;

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