/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminEditUser = () => {
    const [user, setUser] = useState({
        name: 'User 1',
        email: 'user1@example.com',
        role: 'customer',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to your backend
        console.log('Updated User:', user);
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
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Edit User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={user.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select
                            name="role"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={user.role}
                            onChange={handleChange}
                        >
                            <option value="customer">Customer</option>
                            <option value="tailor">Tailor</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update User</button>
                </form>
            </main>

            <footer className="bg-gray-800 p-4 mt-8">
                <div className="container mx-auto text-white text-center">
                    &copy; 2024 PerfectDhaga. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default AdminEditUser;
