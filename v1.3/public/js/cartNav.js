
document.getElementById('cartBtn').addEventListener('click', function () {
    document.getElementById('cartSidebar').classList.add('open');
});

document.getElementById('closeCartBtn').addEventListener('click', function () {
    document.getElementById('cartSidebar').classList.remove('open');
});

document.getElementById('logout-form').addEventListener('submit', function (event) {
    event.preventDefault();
    fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = '/';
        })
        .catch(error => console.error('Error:', error));
});

function saveForLater(element) {
    const cartItem = element.closest('.cart-item');
    const savedForLater = document.getElementById('savedForLater');
    savedForLater.appendChild(cartItem);
    cartItem.querySelector('.cart-item-options').remove();
    cartItem.querySelector('button').remove();
    cartItem.querySelector('input').remove();
    const moveToCartBtn = document.createElement('button');
    moveToCartBtn.className = 'bg-gray-200 text-gray-700 px-4 py-2 rounded';
    moveToCartBtn.innerText = 'Move to Cart';
    moveToCartBtn.onclick = function () {
        moveToCart(moveToCartBtn);
    };
    cartItem.appendChild(moveToCartBtn);
}

function removeFromCart(element) {
    const cartItem = element.closest('.cart-item');
    cartItem.remove();
}

function moveToCart(element) {
    const savedItem = element.closest('.cart-item');
    const cartSidebar = document.querySelector('.cart-sidebar .p-6.space-y-4');
    cartSidebar.appendChild(savedItem);
    savedItem.querySelector('button').remove();
    const optionsBtn = document.createElement('button');
    optionsBtn.className = 'text-gray-500 options-btn';
    optionsBtn.innerHTML = '<i class="fas fa-ellipsis-h"></i>';
    savedItem.appendChild(optionsBtn);
    const optionsDiv = document.createElement('div');
    optionsDiv.className = 'absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg cart-item-options';
    optionsDiv.innerHTML = `
       <a class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onclick="saveForLater(this)">Save for Later</a>
       <a class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer" onclick="removeFromCart(this)">Remove from Cart</a>
     `;
    savedItem.appendChild(optionsDiv);
}
