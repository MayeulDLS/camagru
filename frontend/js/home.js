document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "signin.html";
    })

    try {
        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            window.location.href = 'signin.html';
            return;
        }

        const user = await response.json();
        const titleElement = document.getElementById('title');
        titleElement.textContent = `Welcome ${user.username}`;
    } catch (error) {
        console.error(error);
        window.location.href = 'signin.html';
    }
});
