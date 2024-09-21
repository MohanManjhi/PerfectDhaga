/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
    const orders = [
        { id: 1, user: 'User 1', total: '$100', status: 'Shipped' },
        // Add more orders as needed
    ];

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/admin-dashboard" className="text-white">Dashboard</Link></li>
                            <li><Link to="/admin-products" className="text-white">Manage Products</Link></li>
                            <li><Link to="/admin-users" className="text-white">Manage Users</Link></li>
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Manage Orders</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Order ID</th>
                            <th className="border p-2">User</th>
                            <th className="border p-2">Total</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td className="border p-2">{order.id}</td>
                                <td className="border p-2">{order.user}</td>
                                <td className="border p-2">{order.total}</td>
                                <td className="border p-2">{order.status}</td>
                                <td className="border p-2">
                                    <Link to={`/admin-view-order/${order.id}`} className="text-blue-500">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>

            <footer className="bg-gray-800 p-4 mt-8">
                <div className="container mx-auto text-white text-center">
                    &copy; 2024 PerfectDhaga. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default AdminOrders;
