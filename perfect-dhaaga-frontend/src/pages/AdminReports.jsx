import React from 'react';
import { Link } from 'react-router-dom';

const AdminReports = () => {
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
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Reports</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
                    {/* Add chart or data representation here */}
                    <p>Report details go here...</p>
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

export default AdminReports;
