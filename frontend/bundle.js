document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    const pages = {
        home: '<p>You are logged in</p>',
        signup: `
            <form id="signup-form">
                <h3>Email</h3>
                <input id="signup-email" type="email" required />
                <h3>Username</h3>
                <input id="signup-username" type="text" required />
                <h3>Password</h3>
                <input id="signup-password" type="password" required />
                <button type="submit">Sign Up</button>
            </form>
        `,
        signin: `
            <form id="signin-form">
                <h3>Email</h3>
                <input id="signin-email" type="email" required />
                <h3>Password</h3>
                <input id="signin-password" type="password" required />
                <button type="submit">Sign In</button>
            </form>
        `
    };

    const loadPage = async (page) => {
        const publicPages = ["signup", "signin"];
        if (!publicPages.includes(page)) {
            const token = localStorage.getItem("token");
            if (!token) {
                mainContent.innerHTML = pages["signin"];
                document.getElementById('signin-form').addEventListener('submit', handleSignin);
                return;
            }
            
            try {
                const response = await fetch("http://localhost:5038/api/getuser", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
    
                if (response.status === 401) {
                    mainContent.innerHTML = pages["signin"];
                    document.getElementById('signin-form').addEventListener('submit', handleSignin);
                    return;
                }
    
                const user = await response.json();
                const titleElement = document.getElementById('title');
                if (titleElement && page === "home") {
                    titleElement.textContent = `Welcome ${user.username}`;
                }
            } catch (error) {
                console.error(error);
                mainContent.innerHTML = pages["signin"];
                document.getElementById('signin-form').addEventListener('submit', handleSignin);
                return;
            }
        }
        mainContent.innerHTML = pages[page];
        if (page === 'signup') {
            document.getElementById('title').textContent = `Sign up`;
            document.getElementById('signup-form').addEventListener('submit', handleSignup);
        } else if (page === 'signin') {
            document.getElementById('title').textContent = `Sign in`;
            document.getElementById('signin-form').addEventListener('submit', handleSignin);
        }
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        const email = document.getElementById('signup-email').value;
        const username = document.getElementById('signup-username').value;
        const password = document.getElementById('signup-password').value;
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
            } else {
                const error = await response.json();
                alert('Error: ' + error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Could not create user');
        }
    };

    const handleSignin = async (event) => {
        event.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        try {
            // Envoie la requête POST au backend
            const response = await fetch('http://localhost:5038/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
        
            // Gère la réponse
            if (response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result.token);
            } else {
                const error = await response.json();
                console.error('Error: ', error.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: Could not log in');
        }
    };

    document.getElementById('home-link').addEventListener('click', () => loadPage('home'));
    document.getElementById('signup-link').addEventListener('click', () => loadPage('signup'));
    document.getElementById('signin-link').addEventListener('click', () => loadPage('signin'));

    // Charger la page d'accueil par défaut
    loadPage('home');
});
