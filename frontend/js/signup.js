document.addEventListener('DOMContentLoaded', async () => {
    const header = document.querySelector("header");
    const response = await fetch("../utils/loggedOutHeader.html");
    const content = await response.text();
    header.innerHTML = content;

    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            const errorMessage = document.getElementById("password-error");
            errorMessage.textContent = "Your password should contain at least 6 characters, one alphabetical and one numerical.";
            return;
        }

        const userData = { email, username, password };

        try {
            const response = await fetch('/api/public/createuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                window.location.href = 'verification.html';
            } else {
                const error = await response.json();
                alert("Erreur : " + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
