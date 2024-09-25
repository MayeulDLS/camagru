document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    if (!token || !email) {
        window.location.href = 'signin.html';
        return;
    }
    const header = document.querySelector("header");
    const response = await fetch("../utils/loggedOutHeader.html");
    const content = await response.text();
    header.innerHTML = content;
    
    const passwordUpdate = document.getElementById('reset-password-form');
    passwordUpdate.addEventListener('submit', async (event) => {
        event.preventDefault();
        const password = document.getElementById('reset-password').value;

        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            const errorMessage = document.getElementById("reset-password-error");
            errorMessage.textContent = "Your password must contain at least 6 characters, with one alphabetical and one numerical.";
            return;
        }

        try {
            const response = await fetch('/api/public/resetpassword', {
                method: 'PUT',
                headers: { 
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("Password updated successfully");
            } else {
                const error = await response.json();
                alert(error.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    });

});