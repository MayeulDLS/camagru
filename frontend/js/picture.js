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

    const container = document.getElementById("picture-container");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete this picture";
    deleteButton.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`/api/pictures/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
            })

            const responseData = await response.json();

            if (response.ok) {
                alert("Picture deleted");
            } else {
                alert(responseData.message)
            }
        } catch (error) {
            alert(error.message);
        }
    });

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

        const userResponse = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const user = await userResponse.json();

        // if (pictureData.user === user._id) {
            container.appendChild(deleteButton);
        // }

    } catch (error) {
        alert(error.message);
    }
});