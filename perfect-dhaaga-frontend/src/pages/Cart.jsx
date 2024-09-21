/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
    // Example cart items
    const cartItems = [
        {
            id: 1,
            name: 'Product Name',
            price: 100,
            image: '/images/product1.jpg',
        },
        // Add more items as needed
    ];

    const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <Link to="/" className="text-white text-lg font-semibold">PerfectDhaga</Link>
                        <ul className="flex space-x-4">
                            <li><Link to="/login" className="text-white">Login</Link></li>
                            <li><Link to="/register" className="text-white">Register</Link></li>
                            <li><Link to="/cart" className="text-white">Cart</Link></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Products in Cart</h2>
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.id} className="border p-4 rounded-lg bg-white shadow mb-4">
                                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover float-left mr-4" />
                                    <h3 className="text-lg font-bold">{item.name}</h3>
                                    <p className="text-sm">${item.price}</p>
                                    <button className="text-red-500 mt-2">Remove</button>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="border p-4 rounded-lg bg-white shadow">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        <p className="mb-4">Total: <strong>${totalAmount}</strong></p>
                        <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded">Proceed to Checkout</Link>
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

export default Cart;
