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

        if (pictureData.user === user._id) {
            container.appendChild(deleteButton);
        }

        const likeButton = document.createElement("button");
        likeButton.innerText = `${pictureData.liked.includes(user._id) ? "Dislike" : "Like"} this picture`;
        likeButton.addEventListener("click", async (event) => {
            event.preventDefault();

            try {
                const response = await fetch(`/api/pictures/${id}`, {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId: user._id })
                });

                if (response.ok) {
                    likeButton.innerText = `${likeButton.innerText.includes("Dislike") ? "Like" : "Dislike"} this picture`;
                } else {
                    alert("An error occured, please try again");
                }

            } catch (error) {
                alert(error.message);
            }
        })
        container.appendChild(likeButton);

    } catch (error) {
        alert(error.message);
    }

    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: "GET",
        });

        const commentsData = await response.json();

        const commentsContainer = document.getElementById("comments-container");

        commentsData.forEach(comment => {
            const commentElement = document.createElement("p");
            commentElement.innerText = comment.content;
            commentsContainer.appendChild(commentElement);
        });

    } catch (error) {
        alert(error.message);
    }

    const commentInput = document.getElementById("comment-form");
    commentInput.addEventListener("submit", async (event) => {
        event.preventDefault();

        const input = document.getElementById("comment-input");
        const comment = input.value;

        try {
            const response = await fetch("/api/comments", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pictureId: id,
                    comment: comment,
                }),
            })

            if (response.ok) {
                const commentsContainer = document.getElementById("comments-container");
                const commentElement = document.createElement("p");
                commentElement.innerText = comment;
                commentsContainer.insertBefore(commentElement, commentsContainer.firstChild);
                input.value = "";
            } else {
                alert("An error has occured, please try again");
            }

        } catch (error) {
            alert(error.message);
        }
    })
});