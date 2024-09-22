/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const AdminUsers = () => {
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
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Manage Users</h1>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">User ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Role</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border p-2">1</td>
                            <td className="border p-2">User 1</td>
                            <td className="border p-2">user1@example.com</td>
                            <td className="border p-2">Customer</td>
                            <td className="border p-2">
                                <Link to="/admin-edit-user" className="text-blue-500">Edit</Link> | 
                                <a href="#" className="text-red-500">Delete</a>
                            </td>
                        </tr>
                        {/* Repeat for more users */}
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

export default AdminUsers;
