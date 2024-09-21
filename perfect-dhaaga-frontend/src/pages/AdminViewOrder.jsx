/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const AdminViewOrder = () => {
    // Sample order data, replace this with actual data fetched from an API
    const order = {
        id: 1,
        user: 'User 1',
        total: '$100',
        status: 'Shipped',
        products: [
            { name: 'Product 1', price: '$100' },
            // Add more products as needed
        ],
        shippingAddress: '123 Main St, City, Postal Code',
    };

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/admin-dashboard" className="text-white">Dashboard</Link></li>
                            <li><Link to="/admin-products" className="text-white">Manage Products</Link></li>
                            <li><Link to="/admin-orders" className="text-white">Manage Orders</Link></li>
                            <li><Link to="/admin-users" className="text-white">Manage Users</Link></li>
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Order Details</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
                    <p className="mb-2"><strong>User:</strong> {order.user}</p>
                    <p className="mb-2"><strong>Total:</strong> {order.total}</p>
                    <p className="mb-2"><strong>Status:</strong> {order.status}</p>
                    <h3 className="text-lg font-semibold mt-4">Products:</h3>
                    <ul>
                        {order.products.map((product, index) => (
                            <li key={index}>{product.name} - {product.price}</li>
                        ))}
                    </ul>
                    <h3 className="text-lg font-semibold mt-4">Shipping Address:</h3>
                    <p>{order.shippingAddress}</p>
                </div>
            </main>

            <footer className="bg-gray-800 p-4 mt-8">
                <div className="container mx-auto text-white text-center">
                    &copy; 2024 PerfectDhaga. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default AdminViewOrder;
