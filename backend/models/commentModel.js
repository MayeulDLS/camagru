const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    picture: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Picture" },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", commentSchema);