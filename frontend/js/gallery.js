document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    const response = await fetch("/api/pictures", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    const data = await response.json();

    const container = document.getElementById("images-container");

    data.forEach(imgData => {
        const img = document.createElement("img");
        img.src = imgData.imgUrl;
        img.alt = "Image";
        container.appendChild(img);
    })

});