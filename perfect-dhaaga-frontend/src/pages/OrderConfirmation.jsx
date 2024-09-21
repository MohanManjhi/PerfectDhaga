/* eslint-disable no-unused-vars */
import React from 'react';

const OrderConfirmation = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/signup" className="text-white">Sign Up</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Order Confirmation</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Thank You for Your Order!</h2>
                    <p>Your order has been successfully placed. Your order number is <strong>#12345</strong>.</p>
                    <p>You will receive an email confirmation with the details of your order.</p>
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

export default OrderConfirmation;
