document.addEventListener('DOMContentLoaded', async () => {
    const header = document.querySelector("header");
    const response = await fetch("../utils/loggedOutHeader.html");
    const content = await response.text();
    header.innerHTML = content;

    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/public/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result.token);
                window.location.href = 'home.html';
            } else {
                const error = await response.json();
                alert("Error : " + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    const resetPassword = document.getElementById("reset-password");
    resetPassword.addEventListener("click", async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const message = document.getElementById("reset-password-message");

        try {
            const response = await fetch("/api/public/resetpasswordemail", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const result = await response.json();
            message.textContent = result.message;
        } catch (error) {
            message.textContent = error.message;
            console.error('Error:', error);
        }
    });
});
