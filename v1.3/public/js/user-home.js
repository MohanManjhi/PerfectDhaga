let currentPage = 'orders';

function renderPage(page) {
    currentPage = page;
 const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    switch (page) {
        case 'orders':
            renderOrdersPage();
            break;
        case 'account':
            renderAccountSettingsPage();
            break;
        case 'payment':
            renderPaymentPage();
            break;
        case 'wishlist':
            renderWishlistPage();
            break;
        case 'notifications':
            renderNotificationsPage();
            break;
        case 'tracking':
            renderTrackingPage();
            break;
        default:
            mainContent.innerHTML = '<p>Please select a page from the sidebar.</p>';
    }
}

function renderOrdersPage() {
    const orders = [
        { id: 1, product: 'Laptop', status: 'Shipped' },
        { id: 2, product: 'Smartphone', status: 'Processing' },
    ];

    const ordersList = document.createElement('ul');
    orders.forEach((order) => {
        const orderItem = document.createElement('li');
        orderItem.textContent = `Order #${order.id}: ${order.product} - ${order.status}`;
        ordersList.appendChild(orderItem);
    });

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(ordersList);
}

function renderAccountSettingsPage() {
    const form = document.createElement('form');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = 'John Doe';

    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = 'john@example.com';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Changes';

    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(saveButton);

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(form);
}

function renderPaymentPage() {
    const paymentMethods = document.createElement('div');
    const visaCard = document.createElement('div');
    visaCard.textContent = 'Visa ending in 1234';
    const addNewButton = document.createElement('button');
    addNewButton.textContent = 'Add New Payment Method';

    paymentMethods.appendChild(visaCard);
    paymentMethods.appendChild(addNewButton);

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(paymentMethods);
}

function renderWishlistPage() {
    const wishlistItems = [
        { id: 1, name: 'Wireless Headphones' },
        { id: 2, name: 'Smartwatch' },
    ];

    const wishlistList = document.createElement('ul');
    wishlistItems.forEach((item) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = item.name;
        wishlistList.appendChild(itemElement);
    });

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(wishlistList);
}

function renderNotificationsPage() {
    const notifications = [
        { id: 1, message: 'Your order has been shipped!' },
        { id: 2, message: 'New product available in your wishlist' },
    ];

    const notificationsList = document.createElement('ul');
    notifications.forEach((notification) => {
        const notificationElement = document.createElement('li');
        notificationElement.textContent = notification.message;
        notificationsList.appendChild(notificationElement);
    });

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(notificationsList);
}

function renderTrackingPage() {
    const trackingInfo = document.createElement('div');
    const orderNumber = document.createElement('h3');
    orderNumber.textContent = 'Order #12345';
    const status = document.createElement('p');
    status.textContent = 'Status: In Transit';
    const estimatedDelivery = document.createElement('p');
    estimatedDelivery.textContent = 'Estimated Delivery: June 15, 2023';

    trackingInfo.appendChild(orderNumber);
    trackingInfo.appendChild(status);
    trackingInfo.appendChild(estimatedDelivery);

    const mainContent = document.getElementById('main-content');
    mainContent.appendChild(trackingInfo);
}

function logout() {
    alert('Logging out...');
}