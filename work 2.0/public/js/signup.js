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
