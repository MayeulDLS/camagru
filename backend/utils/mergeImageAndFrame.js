const { createCanvas, loadImage } = require("canvas");

const mergeImageAndFrame = async (base64Image, frameUrl) => {

    const canvas = createCanvas(320, 240);
    const ctx = canvas.getContext("2d");

    const overlayImage = await loadImage(frameUrl);

    const imgBuffer = Buffer.from(base64Image, "base64");
    const mainImg = await loadImage(imgBuffer);

    ctx.drawImage(mainImg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(overlayImage, 0, 0, canvas.width, canvas.height);

    const img = canvas.toDataURL('image/png');

    return img;
};

module.exports = {
    mergeImageAndFrame,
}