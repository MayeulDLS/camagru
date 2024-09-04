document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    signinForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
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
                console.error('Error: ', error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Could not log in');
        }
    });
});
