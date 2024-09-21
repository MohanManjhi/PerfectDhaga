/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Payment = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const handlePayment = (e) => {
        e.preventDefault();
        // Logic to handle payment submission
        console.log('Payment submitted', {
            cardNumber,
            expiryDate,
            cvv,
        });
        // Reset form after submission (optional)
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        alert("Payment processed successfully!");
    };

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Payment</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    {/* Display Order Summary Here */}
                    <form onSubmit={handlePayment}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Card Number</label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="1234 5678 9012 3456"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="MM/YY"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder="123"
                                required
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Pay Now</button>
                    </form>
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

export default Payment;
