/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const ProductListing = () => {
    // Array of products that you can replace with API calls in the future
    const products = [
        { id: 1, name: 'Product 1', price: 100, imageUrl: '/images/product1.jpg' },
        { id: 2, name: 'Product 2', price: 150, imageUrl: '/images/product2.jpg' },
        { id: 3, name: 'Product 3', price: 200, imageUrl: '/images/product3.jpg' },
        { id: 4, name: 'Product 4', price: 250, imageUrl: '/images/product4.jpg' },
        // Add more products as needed
    ];

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/register" className="text-white">Register</a></li>
                            <li><a href="/cart" className="text-white">Cart</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Product Listing</h1>
                <div className="grid grid-cols-4 gap-4">
                    {products.map(product => (
                        <div key={product.id} className="border p-4 rounded-lg bg-white shadow">
                            <img src={product.imageUrl} alt={product.name} className="h-40 w-full object-cover mb-2" />
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p>${product.price}</p>
                            {/* Link to product details page with dynamic route */}
                            <Link to={`/product/${product.id}`} className="block text-blue-500 mt-2">
                                View Details
                            </Link>
                        </div>
                    ))}
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

export default ProductListing;
