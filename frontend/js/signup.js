document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(password)) {
            const errorMessage = document.getElementById("password-error");
            errorMessage.textContent = "Votre mot de passe doit contenir au moins 6 caracteres, un caractere alphabetique et un caractere numerique.";
            return;
        }

        const userData = { email, username, password };

        try {
            const response = await fetch('/api/createuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result.token);
                window.location.href = 'home.html';
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
