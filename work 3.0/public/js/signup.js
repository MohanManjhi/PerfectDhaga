document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        email: document.getElementById('email').value,
        role: document.getElementById('role').value,
        password: document.getElementById('password').value,
        shopName: document.getElementById('shopName').value,
        serviceProvided: document.getElementById('serviceProvided').value,
        itemsProvided: document.getElementById('itemsProvided').value
    };

    try {
        const response = await fetch('/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Signup successful! You can now login.');
            window.location.href = '/login.html';
        } else {
            alert(`Signup failed: ${result.error}`);
        }
    } catch (error) {
        alert('An error occurred during signup.');
        console.error('Signup error:', error);
    }
});
