document.getElementById('forgotPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        const result = await response.json();

        if (result.error) {
            alert(`Error: ${result.error}`);
        } else {
            alert('Reset link sent to your email.');
        }
    } catch (error) {
        alert('An error occurred.');
        console.error('Forgot password error:', error);
    }
});
