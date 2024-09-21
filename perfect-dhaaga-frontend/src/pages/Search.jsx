/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        // Simulate a search operation
        // Replace this with your actual search logic (API call)
        if (query) {
            const simulatedResults = [/* Simulated results based on query */];
            setResults(simulatedResults);
        } else {
            setResults([]);
        }
    };

    return (
        <div>
            <header>
                <nav className="bg-gray-800 p-4">
                    <div className="container mx-auto flex justify-between items-center">
                        <a href="/" className="text-white text-lg font-semibold">PerfectDhaga</a>
                        <form onSubmit={handleSearch} className="flex">
                            <input 
                                type="text" 
                                value={query} 
                                onChange={(e) => setQuery(e.target.value)} 
                                className="w-full p-2 border border-gray-300 rounded" 
                                placeholder="Search..." 
                            />
                            <button className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
                        </form>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-8">
                <h1 className="text-2xl font-bold mb-8">Search Results</h1>
                <div className="bg-white p-6 rounded-lg shadow">
                    {results.length > 0 ? (
                        results.map((result, index) => (
                            <div key={index} className="mb-4">
                                {/* Display individual result */}
                                <p className="text-gray-700">{result.name}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-700">No results found for your query.</p>
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

export default Search;
