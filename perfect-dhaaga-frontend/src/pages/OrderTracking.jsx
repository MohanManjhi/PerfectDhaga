/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const OrderTracking = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [trackingInfo, setTrackingInfo] = useState(null);

    const handleTrackOrder = async (e) => {
        e.preventDefault();
        // Simulate an API call to fetch tracking info
        const fetchedTrackingInfo = {
            orderNumber,
            status: 'Shipped',
            estimatedDelivery: '2024-10-05',
            items: [
                { name: 'Product 1', quantity: 1 },
                { name: 'Product 2', quantity: 2 },
            ],
        };
        setTrackingInfo(fetchedTrackingInfo);
    };

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/signup" className="text-white">Sign Up</a></li>
                            <li><a href="/order-tracking" className="text-white">Order Tracking</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Order Tracking</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
                    <form onSubmit={handleTrackOrder}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Order Number</label>
                            <input 
                                type="text" 
                                name="orderNumber" 
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded" 
                                required 
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Track</button>
                    </form>

                    {/* Display tracking information if available */}
                    {trackingInfo && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold">Tracking Information</h3>
                            <p><strong>Order Number:</strong> {trackingInfo.orderNumber}</p>
                            <p><strong>Status:</strong> {trackingInfo.status}</p>
                            <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                            <h4 className="text-lg font-semibold mt-4">Items:</h4>
                            <ul>
                                {trackingInfo.items.map((item, index) => (
                                    <li key={index}>{item.name} - Quantity: {item.quantity}</li>
                                ))}
                            </ul>
                        </div>
                    )}
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

export default OrderTracking;
