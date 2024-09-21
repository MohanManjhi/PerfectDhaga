import React from 'react';

const TailorProfile = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/signup" className="text-white">Sign Up</a></li>
                            <li><a href="/logout" className="text-white">Logout</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Tailor Profile</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <form action="/update-tailor-profile" method="POST">
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                defaultValue="Tailor 1" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                defaultValue="tailor1@example.com" 
                                required 
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Specialization</label>
                            <input 
                                type="text" 
                                name="specialization" 
                                className="w-full p-2 border border-gray-300 rounded" 
                                defaultValue="Men's Clothing" 
                                required 
                            />
                        </div>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update Profile</button>
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

export default TailorProfile;
