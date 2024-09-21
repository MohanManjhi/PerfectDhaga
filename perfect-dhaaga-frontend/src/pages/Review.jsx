/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Review = () => {
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your review submission logic here (e.g., API call)
        const reviewData = {
            rating,
            reviewText,
        };
        console.log('Review submitted:', reviewData);
        // Reset form after submission if needed
        setRating(5);
        setReviewText('');
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-8">Product Review</h1>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Rating</label>
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required
                        >
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★</option>
                            <option value="3">★★★</option>
                            <option value="2">★★</option>
                            <option value="1">★</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Your Review</label>
                        <textarea 
                            value={reviewText} 
                            onChange={(e) => setReviewText(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            rows="5" 
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
                </form>
            </div>
        </div>
    );
};

export default Review;
