document.getElementById('signup-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the form from reloading the page

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();

    if (data.success) {
        alert('User created successfully!');
        // Optionally, redirect to login
        window.location.href = 'login.html';
    } else {
        alert(data.message);
    }
});
