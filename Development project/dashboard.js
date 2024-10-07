
// Function to show the specified section and hide the others
function showSection(section) {
    document.querySelectorAll('.section').forEach((el) => el.classList.add('hidden'));
    document.getElementById(section).classList.remove('hidden');
}

// Display the Profile section by default on page load
document.getElementById('profile').classList.remove('hidden');

// Function to remove an item from the wishlist
function removeFromWishlist(productId) {
    var productElement = document.getElementById(productId);
    if (productElement) {
        productElement.remove(); // Remove the product from the wishlist
    }
    console.log(productId + " removed from wishlist.");
}

// Function to add an item to the cart and remove from wishlist
function addToCart(productId, cartId) {
    var productElement = document.getElementById(productId);
    var cartElement = document.getElementById(cartId);

    if (productElement && cartElement) {
        var clonedProduct = productElement.cloneNode(true);
        clonedProduct.querySelector('button.bg-black').remove(); // Remove "Add to Cart" button in cart
        cartElement.appendChild(clonedProduct); // Append cloned product to the cart
        console.log(productId + " added to cart.");
        productElement.remove(); // Remove the item from the wishlist
    }
}

// Function to toggle between payment forms
function showForm(paymentMethod) {
    var cardForm = document.getElementById('card-form');
    var upiForm = document.getElementById('upi-form');
    var cardButton = document.getElementById('card-button');
    var upiButton = document.getElementById('upi-button');

    if (paymentMethod === 'card') {
        cardForm.style.display = 'block';
        upiForm.style.display = 'none';
        cardButton.classList.add('bg-gray-200');
        cardButton.classList.remove('bg-gray-100');
        upiButton.classList.add('bg-gray-100');
        upiButton.classList.remove('bg-gray-200');
    } else if (paymentMethod === 'upi') {
        cardForm.style.display = 'none';
        upiForm.style.display = 'block';
        upiButton.classList.add('bg-gray-200');
        upiButton.classList.remove('bg-gray-100');
        cardButton.classList.add('bg-gray-100');
        cardButton.classList.remove('bg-gray-200');
    }
}

// Function to delete a payment method
function deletePaymentMethod(element) {
    element.parentElement.remove();
}

// Function to add a new card
function addCard() {
    var cardNumber = document.getElementById('card-number').value;
    var cardName = document.getElementById('card-name').value;
    var expiryDate = document.getElementById('expiry-date').value;
    var cvv = document.getElementById('cvv').value;

    if (cardNumber && cardName && expiryDate && cvv) {
        var paymentMethods = document.getElementById('payment-methods');
        var newCard = `
            <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-credit-card text-xl"></i>
                    <div>
                        <p class="font-semibold">Card ending in ${cardNumber.slice(-4)}</p>
                        <p class="text-gray-600">Expires ${expiryDate}</p>
                    </div>
                </div>
                <i class="fas fa-trash-alt text-xl cursor-pointer" onclick="deletePaymentMethod(this)"></i>
            </div>
        `;
        paymentMethods.insertAdjacentHTML('beforeend', newCard);
        alert('Card added successfully!');
        document.getElementById('card-form').reset();
    } else {
        alert('Please fill all the card details.');
    }
}

// Function to add a new UPI method
function addUPI() {
    var upiId = document.getElementById('upi-id').value;

    if (upiId) {
        var paymentMethods = document.getElementById('payment-methods');
        var newUPI = `
            <div class="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div class="flex items-center space-x-4">
                    <i class="fas fa-university text-xl"></i>
                    <div>
                        <p class="font-semibold">UPI: ${upiId}</p>
                    </div>
                </div>
                <i class="fas fa-trash-alt text-xl cursor-pointer" onclick="deletePaymentMethod(this)"></i>
            </div>
        `;
        paymentMethods.insertAdjacentHTML('beforeend', newUPI);
        alert('UPI added successfully!');
        document.getElementById('upi-form').reset();
    } else {
        alert('Please enter a UPI ID.');
    }
}

// Function to show the order details modal
function showOrderDetails(orderNumber, orderDate, orderStatus) {
    document.getElementById('modal-order-number').textContent = orderNumber;
    document.getElementById('modal-order-date').textContent = orderDate;
    document.getElementById('modal-order-status').textContent = orderStatus;
    document.getElementById('order-modal').classList.remove('hidden');
}

// Function to close the order modal
function closeModal() {
    document.getElementById('order-modal').classList.add('hidden');
}

// Image preview functionality
document.getElementById('profileImage').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profileImagePreview').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});
