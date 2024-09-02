document.getElementById('signup-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Empêche la soumission par défaut du formulaire

    // Récupère les valeurs des champs
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Prépare les données pour l'envoi
    const userData = {
        email: email,
        username: username,
        password: password
    };

    try {
        // Envoie la requête POST au backend
        const response = await fetch('http://localhost:5038/api/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        // Gère la réponse
        if (response.ok) {
            const result = await response.json();
            alert('User created successfully!');
            console.log(result);
        } else {
            const error = await response.json();
            alert('Error: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error: Could not create user');
    }
});
