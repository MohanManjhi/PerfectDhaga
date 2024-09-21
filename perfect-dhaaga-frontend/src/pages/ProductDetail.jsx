/* eslint-disable no-unused-vars */
import React from 'react';

const ProductDetail = () => {
    const product = {
        name: 'Product Name',
        price: 100,
        description: 'This is the detailed description of the product.',
        imageUrl: '../images/product1.jpg',
    };

    const handleAddToCart = () => {
        // Logic to handle adding the product to the cart
        console.log(`${product.name} added to cart.`);
        alert(`${product.name} has been added to your cart!`);
    };

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <ul className="flex space-x-4">
                            <li><a href="/login" className="text-white">Login</a></li>
                            <li><a href="/register" className="text-white">Register</a></li>
                            <li><a href="/cart" className="text-white">Cart</a></li>
                        </ul>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <div className="flex">
                    <div className="w-1/2">
                        <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-80 h-50 object-cover rounded shadow" 
                        />
                    </div>
                    <div className="w-1/2 ml-8">
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <p className="mt-4 text-lg">${product.price}</p>
                        <p className="mt-2">{product.description}</p>
                        <button 
                            onClick={handleAddToCart} 
                            className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                        >
                            Add to Cart
                        </button>
                    </div>
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

export default ProductDetail;
