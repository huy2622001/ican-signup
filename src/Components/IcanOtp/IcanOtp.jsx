import React, { useState } from "react";
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router-dom';

import './IcanOtp.css';
import config from "../../config/config";

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const location = useLocation();
    const userId = Number(location.state.userId);
    const navigate = useNavigate();
    const handleOtpVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${config.apiBaseUrl}/sign-up/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userId, otp }),
            });

            if (response.ok) {
                navigate('/sign-in');
            } else {
                const result = await response.json();
                setError(result.message || 'Failed to verify OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="App">
            <h2 className="word1">VERIFY YOUR ACCOUNT</h2>
            <p id="text">We've sent a verification email to j******@email.com</p>
            <p id="text">Kindly get OTP from the email to verify your account and log in.</p>
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span> </span>}
                inputType="tel"
                containerStyle={{ display: 'unset' }}
                inputStyle={{ width: "3rem", height: "3.5rem" }}
                renderInput={(props) => <input {...props} className='otp-input' />}
            />
            {error && <p className="error-message">{error}</p>}  {/* Display error message if any */}
            <div className="word">
                <p id="text">Didn’t receive a link? If you’ve already checked your spam folder, you can request to
                    resend the link here after 10 minutes.</p>
            </div>
            <div className='btn-otp-container'>
                <button type='button' className='btn-otp gray'>RE-SEND VERIFICATION LINK</button>
                <button type='button' className='btn-otp' onClick={handleOtpVerification}>VERIFY</button>
            </div>
        </div>
    );
};

export default Otp;
