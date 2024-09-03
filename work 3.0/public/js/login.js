document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token); // Store the token in localStorage
            alert('Login successful!');
            window.location.href = '/dashboard.html';
        } else {
            alert(`Login failed: ${result.error}`);
        }
    } catch (error) {
        alert('An error occurred during login.');
        console.error('Login error:', error);
    }
});
