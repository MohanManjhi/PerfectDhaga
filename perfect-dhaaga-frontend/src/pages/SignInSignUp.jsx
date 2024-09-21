/* eslint-disable no-unused-vars */
import React from 'react';

const SignInSignUp = () => {
    const handleOverlayClick = () => {
        const container = document.getElementById('container');
        container.classList.toggle('right-panel-active');
    };

    return (
        <div className="container" id="container">
            <div className="form-container sign-up-container">
                <form action="#">
                    <h1>Create Account</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <div className="infield">
                        <input type="text" placeholder="Username" />
                        <label></label>
                    </div>
                    <div className="infield">
                        <input type="email" placeholder="Email" name="email" />
                        <label></label>
                    </div>
                    <div className="infield">
                        <input type="password" placeholder="Password" />
                        <label></label>
                    </div>
                    <button>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in-container">
                <form action="#">
                    <h1>Sign in</h1>
                    <div className="social-container">
                        <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <div className="infield">
                        <input type="email" placeholder="Email" name="email" />
                        <label></label>
                    </div>
                    <div className="infield">
                        <input type="password" placeholder="Password" />
                        <label></label>
                    </div>
                    <a href="#" className="forgot">Forgot your password?</a>
                    <button>Sign In</button>
                </form>
            </div>
            <div className="overlay-container" id="overlayCon">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your credentials to log in and start</p>
                        <button onClick={handleOverlayClick}>Sign In</button>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <h1>Hello, New Here!</h1>
                        <p>No worries you can start your journey with us</p>
                        <button onClick={handleOverlayClick}>Sign Up</button>
                    </div>
                </div>
                <button id="overlayBtn" onClick={handleOverlayClick}></button>
            </div>
        </div>
    );
};

export default SignInSignUp;
