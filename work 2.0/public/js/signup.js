// Handle role change and dynamically add fields
document.getElementById('role').addEventListener('change', function () {
    const role = this.value;
    const additionalFields = document.getElementById('additionalFields');
    
    additionalFields.innerHTML = ''; // Clear existing fields
    
    if (role === 'tailor') {
        additionalFields.innerHTML = `
            <label for="shopName">Shop Name</label>
            <input type="text" id="shopName" name="shopName" required>
            <label for="serviceProvided">Service Provided</label>
            <input type="text" id="serviceProvided" name="serviceProvided" required>
        `;
    } else if (role === 'vendor') {
        additionalFields.innerHTML = `
            <label for="shopName">Shop Name</label>
            <input type="text" id="shopName" name="shopName" required>
            <label for="itemsProvided">Items Provided</label>
            <input type="text" id="itemsProvided" name="itemsProvided" required>
        `;
    }
});

// Handle form submission and send data to backend
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(this); // Create FormData object from form
    const data = Object.fromEntries(formData.entries()); // Convert FormData to plain object

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()) // Expecting a JSON response from the server
    .then(data => {
        if (data.success) {
            alert('Signup successful');
            // Redirect or show success message
        } else {
            alert('Signup failed: ' + data.message);
            // Handle error
        }
    })
    .catch(error => console.error('Error:', error));
});
