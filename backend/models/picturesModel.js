const mongoose = require("mongoose");

const picturesSchema = mongoose.Schema({
    user: { type: String, required: true },
    imgUrl: { type: String, required: true }
});

module.exports = mongoose.model("Picture", picturesSchema);