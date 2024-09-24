const downloadImageFromUrl = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to download image: ${response.statusText}`);
        }

        const arrayBuffer = await response.arrayBuffer(); // Convertir la réponse en ArrayBuffer
        return Buffer.from(arrayBuffer); // Convertir ArrayBuffer en Buffer
    } catch (error) {
        throw new Error(`Failed to download frame from URL: ${error.message}`);
    }
};

module.exports = {
    downloadImageFromUrl,
}