document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const roleSelect = document.getElementById('role');

    // Update additional fields based on selected role
    roleSelect.addEventListener('change', () => {
        const role = roleSelect.value;
        const additionalFields = document.getElementById('additionalFields');
        additionalFields.innerHTML = ''; // Clear previous fields

        if (role === 'tailor') {
            additionalFields.innerHTML = `
                <label for="shopName">Shop Name</label>
                <input type="text" id="shopName" name="shopName">
                <label for="serviceProvided">Service Provided</label>
                <input type="text" id="serviceProvided" name="serviceProvided">
            `;
        } else if (role === 'vendor') {
            additionalFields.innerHTML = `
                <label for="shopName">Shop Name</label>
                <input type="text" id="shopName" name="shopName">
                <label for="itemsProvided">Items Provided</label>
                <input type="text" id="itemsProvided" name="itemsProvided">
            `;
        }
    });

    // Handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            email: document.getElementById('email').value,
            role: document.getElementById('role').value,
            password: document.getElementById('password').value,
            shopName: document.getElementById('shopName') ? document.getElementById('shopName').value : '',
            serviceProvided: document.getElementById('serviceProvided') ? document.getElementById('serviceProvided').value : '',
            itemsProvided: document.getElementById('itemsProvided') ? document.getElementById('itemsProvided').value : ''
        };

        try {
            console.log('Submitting form data:', formData);

            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const result = await response.json();

            if (result.error) {
                alert(`Signup failed: ${result.error}`);
            } else {
                alert('Signup successful! You can now login.');
                window.location.href = 'http://localhost:3000/login.html';
            }
        } catch (error) {
            alert('An error occurred during signup.');
            console.error('Signup error:', error);
        }
    });
});
