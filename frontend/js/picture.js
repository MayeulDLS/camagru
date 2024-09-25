document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }
    const header = document.querySelector("header");
    const response = await fetch("../utils/loggedInHeader.html");
    const content = await response.text();
    header.innerHTML = content;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    try {
        const response = await fetch(`/api/pictures/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const pictureData = await response.json();

        const picture = document.getElementById("picture");
        picture.src = pictureData.imgUrl;

    } catch (error) {
        console.error(error);
    }
});