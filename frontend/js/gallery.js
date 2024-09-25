document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem("token");
    const header = document.querySelector("header");
    if (!token) {
        const response = await fetch("../utils/loggedOutHeader.html");
        const content = await response.text();
        header.innerHTML = content;
    } else {
        const response = await fetch("../utils/loggedInHeader.html");
        const content = await response.text();
        header.innerHTML = content;
        // logout
        document.getElementById("logout").addEventListener("click", () => {
            localStorage.removeItem("token");
            window.location.href = "signin.html";
        })
    }

    let currentPage = 1;
    const response = await fetch(`/api/public/numberofpictures`, {
        method: "GET"
    });
    const totalData = await response.json();
    const totalPages = Math.ceil(totalData.total / 5);

    const container = document.getElementById("images-container");

    const displayPictures = async () => {

        const response = await fetch(`/api/public/pictures?page=${currentPage}`, {
            method: "GET"
        });

        const data = await response.json();

        container.innerHTML = "";

        data.forEach(imgData => {
            const img = document.createElement("img");
            img.src = imgData.imgUrl;
            img.alt = "Image";

            const link = document.createElement("a");
            link.href = `picture.html?id=${imgData._id}`;
            link.appendChild(img);

            container.appendChild(link);
        })

        pageNumber.innerText = `${currentPage} / ${totalPages}`;
    }

    displayPictures();

    const pageNumber = document.getElementById("page-number");
    const previousPageButton = document.getElementById("previous-page");
    previousPageButton.addEventListener("click", () => {
        if (currentPage !== 1) {
            currentPage--;
            displayPictures();
        }
    })
    const nextPageButton = document.getElementById("next-page");
    nextPageButton.addEventListener("click", () => {
        if (currentPage !== totalPages) {
            currentPage++;
            displayPictures();
        }
    })

});