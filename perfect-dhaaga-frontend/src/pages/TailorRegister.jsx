/* eslint-disable no-unused-vars */
import React from 'react';

const TailorRegister = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-center">Tailor Registration</h2>
                <form action="/tailor-register" method="POST">
                    <div className="mb-4">
                        <label className="block text-gray-700">Business Name</label>
                        <input 
                            type="text" 
                            name="businessName" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tailor Name</label>
                        <input 
                            type="text" 
                            name="tailorName" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number</label>
                        <input 
                            type="text" 
                            name="mobile" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required 
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TailorRegister;
