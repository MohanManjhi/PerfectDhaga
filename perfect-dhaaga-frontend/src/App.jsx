/* eslint-disable no-unused-vars */
import React from 'react';
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
    const userRole = 'user'; // This should be dynamically set based on logged-in user

    return (
        <Router>
            <Routes>
                <Route path="/" exact component={<Home/>} />
                <Route path="/login" component={<Login/>} />
                <Route path="/register" component={<Register/>} />
                <Route path="/sign-in-sign-up" element={<SignInSignUp />} />


                {/* User routes */}
                {userRole === 'user' && (
                    <>
                        <Route path="/user/dashboard" component={<UserDashboard/>} />
                        <Route path="/user/profile" component={<UserProfile/>} />
                        <Route path="/wishlist" component={<Wishlist/>} />
                    </>
                )}

                {/* Tailor routes */}
                {userRole === 'tailor' && (
                    <>
                        <Route path="/tailor/dashboard" component={<TailorDashboard/>} />
                        <Route path="/tailor/profile" component={<TailorProfile/>} />
                    </>
                )}

                {/* Vendor routes */}
                {userRole === 'vendor' && (
                    <>
                        <Route path="/vendor/dashboard" component={<VendorDashboard/>} />
                        <Route path="/vendor/profile" component={<VendorProfile/>} />
                    </>
                )}

                {/* Admin routes */}
                {userRole === 'admin' && (
                    <>
                        <Route path="/admin/dashboard" component={<AdminDashboard/>} />
                        <Route path="/admin/users" component={<AdminUsers/>} />
                        <Route path="/admin/orders" component={<AdminOrders/>} />
                        {/* Add more admin routes here... */}
                    </>
                )}

                {/* Fallback route */}
                <Route path="*" component={() => <div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
};

export default App;
