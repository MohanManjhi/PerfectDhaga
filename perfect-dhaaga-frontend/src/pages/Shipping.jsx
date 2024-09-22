/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Shipping = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData); // Replace this with your actual submission logic (e.g., API call)
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
                <h1 className="text-2xl font-bold mb-8">Shipping Information</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Shipping Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Country</label>
                            <input
                                type="text"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                                className="w-full p-2 border border-gray-300 rounded"
                                required
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Continue to Payment</button>
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

export default Shipping;
