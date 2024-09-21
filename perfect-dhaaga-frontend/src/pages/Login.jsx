/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Implement your login logic here
        // On successful login:
        navigate('/user-dashboard'); // Redirect to user dashboard or another page
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded-lg w-1/3">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4 text-center">
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
                    </div>
                </form>
                <div className="text-center">
                    <a href="/register" className="text-blue-500">Dot have an account? Register</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
