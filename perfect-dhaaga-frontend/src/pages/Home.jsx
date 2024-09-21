/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
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
                <section className="mb-8">
                    <div className="bg-gray-100 h-64 flex justify-center items-center">
                        <h1 className="text-4xl font-bold">Welcome to PerfectDhaga</h1>
                    </div>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Categories</h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="p-4 bg-white shadow rounded-lg">
                            <h3 className="text-lg font-bold">Tailors</h3>
                        </div>
                        <div className="p-4 bg-white shadow rounded-lg">
                            <h3 className="text-lg font-bold">Vendors</h3>
                        </div>
                        <div className="p-4 bg-white shadow rounded-lg">
                            <h3 className="text-lg font-bold">Raw Materials</h3>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="p-4 bg-white shadow rounded-lg">
                            <img src="../images/product1.jpg" alt="Product 1" className="w-full h-full object-cover" />
                            <h3 className="mt-2 font-semibold">Color Red White Printed Kurta</h3>
                            <p>500</p>
                        </div>
                        {/* Repeat for more products */}
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 p-4 mt-8">
                <div className="container mx-auto text-white text-center">
                    &copy; 2024 PerfectDhaga. All rights reserved.
                </div>
            </footer>
        </>
    );
};

export default Home;
