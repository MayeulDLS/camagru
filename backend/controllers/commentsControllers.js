const {
    postComment,
    getComments,
} = require("../services/commentsServices")

const postCommentController = async (req, res) => {
    try {
        const { pictureId, comment } = req.body;

        if (!pictureId || !comment) {
            return res.status(400).send({ message: "Missing picture id or comment" });
        }

        const response = await postComment(req.user.id, pictureId, comment);

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const getCommentsController = async (req, res) => {
    try {
        const pictureId = req.params.id;

        if (!pictureId) {
            return res.status(400).send({ message: "Missing picture id" });
        }

        const response = await getComments(pictureId);

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

module.exports = {
    postCommentController,
    getCommentsController,
};