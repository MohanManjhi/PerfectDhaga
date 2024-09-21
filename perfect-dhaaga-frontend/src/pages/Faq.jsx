/* eslint-disable no-unused-vars */
import React from 'react';

const Faq = () => {
    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/signup" className="text-white">Sign Up</a></li>
                            <li><a href="/faq" className="text-white">FAQ</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Frequently Asked Questions</h1>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">General Questions</h2>

                    <div className="mb-4">
                        <h3 className="font-semibold">What is PerfectDhaga?</h3>
                        <p>PerfectDhaga is an eCommerce platform that connects users with skilled tailors and vendors for custom clothing.</p>
                    </div>

                    <div className="mb-4">
                        <h3 className="font-semibold">How do I create an account?</h3>
                        <p>You can create an account by signing up on the registration page. Fill in your details and choose your role (user, tailor, vendor).</p>
                    </div>

                    {/* Add more FAQs as needed */}
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

export default Faq;
