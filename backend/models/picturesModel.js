const mongoose = require("mongoose");

const picturesSchema = mongoose.Schema({
    user: { type: String, required: true, ref: "User" },
    imgUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Picture", picturesSchema);