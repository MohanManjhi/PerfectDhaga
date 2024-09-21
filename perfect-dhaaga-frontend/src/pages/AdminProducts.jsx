import React from 'react';
import { Link } from 'react-router-dom';

const AdminProducts = () => {
    const products = [
        { id: 1, name: 'Product 1', price: '$100', stock: 10 },
        // Add more products as needed
    ];

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/admin-dashboard" className="text-white">Dashboard</Link></li>
                            <li><Link to="/admin-orders" className="text-white">Manage Orders</Link></li>
                            <li><Link to="/admin-users" className="text-white">Manage Users</Link></li>
                            <li><Link to="/admin-reports" className="text-white">Reports</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Manage Products</h1>
                <Link to="/admin-add-product" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add New Product</Link>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Product ID</th>
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Stock</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border p-2">{product.id}</td>
                                <td className="border p-2">{product.name}</td>
                                <td className="border p-2">{product.price}</td>
                                <td className="border p-2">{product.stock}</td>
                                <td className="border p-2">
                                    <Link to={`/admin-edit-product/${product.id}`} className="text-blue-500">Edit</Link> | 
                                    <button className="text-red-500" onClick={() => handleDelete(product.id)}>Delete</button>
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

    function handleDelete(id) {
        // Logic for deleting a product
        console.log(`Deleting product with id: ${id}`);
    }
};

export default AdminProducts;
