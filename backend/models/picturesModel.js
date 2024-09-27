const mongoose = require("mongoose");

const picturesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    imgUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    liked: { type: [mongoose.Schema.Types.ObjectId], required: false },
});

module.exports = mongoose.model("Picture", picturesSchema);