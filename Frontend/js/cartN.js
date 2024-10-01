const cart = [];
const cartItemsDiv = document.getElementById('cart-items');
const cartDiv = document.getElementById('cart');
const toggleCartButton = document.getElementById('toggle-cart');
const clearCartButton = document.getElementById('clear-cart');
const proceedButton = document.getElementById('proceed');

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const productDiv = this.parentElement;
        const productName = productDiv.dataset.product;
        const fabric = productDiv.dataset.fabric;
        const tailor = productDiv.dataset.tailor;

        const item = { productName, fabric, tailor };
        cart.push(item);
        updateCart();
    });
});

// Update cart display
function updateCart() {
    cartItemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <span>${item.productName} (${item.fabric}, ${item.tailor})</span>
            <button class="remove" data-index="${index}">Remove</button>
        `;
        cartItemsDiv.appendChild(div);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.dataset.index;
            cart.splice(index, 1);
            updateCart();
        });
    });
}

// Toggle cart visibility
toggleCartButton.addEventListener('click', function () {
    cartDiv.classList.toggle('open');
});

// Clear cart functionality
clearCartButton.addEventListener('click', function () {
    cart.length = 0; // Clear the cart array
    updateCart();
});

// Proceed to checkout functionality
proceedButton.addEventListener('click', function () {
    if (cart.length > 0) {
        alert('Proceeding to checkout...');
    } else {
        alert('Your cart is empty!');
    }
});
