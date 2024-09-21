/* eslint-disable no-unused-vars */
import React from 'react';

const Wishlist = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <a href="/logout" className="text-white">Logout</a>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">My Wishlist</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    {/* Display wishlist items here */}
                    <p className="text-gray-700">Your wishlist is currently empty.</p>
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

export default Wishlist;
