import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    // Sample data, replace this with actual data from your backend
    const totalProducts = 120;
    const totalOrders = 50;
    const totalUsers = 200;

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/admin-products" className="text-white">Manage Products</Link></li>
                            <li><Link to="/admin-orders" className="text-white">Manage Orders</Link></li>
                            <li><Link to="/admin-users" className="text-white">Manage Users</Link></li>
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                        <p>{totalProducts}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                        <p>{totalOrders}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                        <p>{totalUsers}</p>
                    </div>
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

export default AdminDashboard;
