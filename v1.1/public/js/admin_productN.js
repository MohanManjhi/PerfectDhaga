let products = [];

document.addEventListener('DOMContentLoaded', () => {
    const addProductBtn = document.getElementById('addProductBtn');
    const modal = document.getElementById('addProductModal');
    const submitProductBtn = document.getElementById('submitProductBtn');

    addProductBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    submitProductBtn.addEventListener('click', addProduct);

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    fetchProducts();
});

function fetchProducts() {
    // Simulating API call to fetch products
    products = [
        { id: '1', name: 'Product 1', price: 19.99, stock: 100 },
        { id: '2', name: 'Product 2', price: 29.99, stock: 50 },
        { id: '3', name: 'Product 3', price: 39.99, stock: 75 },
    ];
    renderProducts();
}

function renderProducts() {
    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td><button class="btn" onclick="deleteProduct('${product.id}')">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });
}

function addProduct() {
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const stock = parseInt(document.getElementById('stock').value);

    if (name && !isNaN(price) && !isNaN(stock)) {
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            price,
            stock
        };

        products.push(newProduct);
        renderProducts();

        // Clear form and close modal
        document.getElementById('name').value = '';
        document.getElementById('price').value = '';
        document.getElementById('stock').value = '';
        document.getElementById('addProductModal').style.display = 'none';
    } else {
        alert('Please fill all fields with valid values.');
    }
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    renderProducts();
}