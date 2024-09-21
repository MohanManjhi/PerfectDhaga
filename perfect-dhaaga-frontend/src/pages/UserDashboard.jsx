/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <Link to="/logout" className="text-white">Logout</Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">User Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Orders</h2>
                        <p className="text-gray-700">View and manage your orders.</p>
                        <Link to="/user/orders" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">My Orders</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Account Settings</h2>
                        <p className="text-gray-700">Manage your account details and password.</p>
                        <Link to="/user/settings" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">Account Settings</Link>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Wishlist</h2>
                        <p className="text-gray-700">View your wishlist items.</p>
                        <Link to="/wishlist" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">View Wishlist</Link>
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

export default UserDashboard;
