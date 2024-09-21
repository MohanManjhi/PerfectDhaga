/* eslint-disable no-unused-vars */
import React from 'react';

const VendorDashboard = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <a href="/logout" className="text-white">Logout</a>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Vendor Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Manage Products</h2>
                        <p className="text-gray-700">Add, update, and manage raw materials you sell.</p>
                        <a href="/vendor/products" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">Manage Products</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Orders</h2>
                        <p className="text-gray-700">View and manage your orders.</p>
                        <a href="/vendor/orders" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">View Orders</a>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">Profile</h2>
                        <p className="text-gray-700">Update your business profile and contact details.</p>
                        <a href="/vendor/profile" className="mt-4 block bg-blue-500 text-white px-4 py-2 rounded text-center">Edit Profile</a>
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

export default VendorDashboard;
