/* eslint-disable no-unused-vars */
import React from 'react';
// src/index.js or src/App.js
import './tailwind.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import UserDashboard from './pages/userDashboard';
import UserProfile from './pages/userProfile';
import Wishlist from './pages/wishlist';
import TailorDashboard from './pages/tailorDashboard';
import TailorProfile from './pages/tailorProfile';
import VendorDashboard from './pages/vendorDashboard';
import VendorProfile from './pages/vendorProfile';
import AdminDashboard from './pages/adminDashboard';
import AdminUsers from './pages/adminUsers';
import AdminOrders from './pages/adminOrders';
import SignInSignUp from './pages/SignInSignUp.jsx';

const App = () => {
    const userRole = 'user'; 
    return (
        <Router>
            <Routes>
                {/* Define your routes with the "element" prop */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/sign-in-sign-up" element={<SignInSignUp />} />

                {/* User routes */}
                {userRole === 'user' && (
                    <>
                        <Route path="/user/dashboard" element={<UserDashboard />} />
                        <Route path="/user/profile" element={<UserProfile />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                    </>
                )}

                {/* Tailor routes */}
                {userRole === 'tailor' && (
                    <>
                        <Route path="/tailor/dashboard" element={<TailorDashboard />} />
                        <Route path="/tailor/profile" element={<TailorProfile />} />
                    </>
                )}

                {/* Vendor routes */}
                {userRole === 'vendor' && (
                    <>
                        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
                        <Route path="/vendor/profile" element={<VendorProfile />} />
                    </>
                )}

                {/* Admin routes */}
                {userRole === 'admin' && (
                    <>
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/orders" element={<AdminOrders />} />
                    </>
                )}

                {/* Fallback route */}
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
