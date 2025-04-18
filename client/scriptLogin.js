// Handle login functionality
document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (response.ok) {
    alert('Login Successful');
    localStorage.setItem('token', data.token); // Save JWT token in localStorage
    window.location.href = '/'; // Redirect to home or dashboard page
  } else {
    alert(data.message || 'Login Failed');
  }
});
