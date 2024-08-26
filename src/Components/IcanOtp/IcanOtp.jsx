import React, { useState } from "react";
import OtpInput from 'react-otp-input'
import { useNavigate} from 'react-router-dom'

import './IcanOtp.css'

const Otp = () => {
    const navigate = useNavigate();
    const [otp, setOtp,] = useState('');

    const fetchOtp = async () =>{
        const generatedOtp = " ";
        localStorage.setItem("otp", generatedOtp);
        setOtp(generatedOtp);
    }

    const getOtpFromLocalStorage = () => {
        const storedOtp = localStorage.getItem("otp");
        if(storedOtp) {
            setOtp(storedOtp);
        }
        console.log('OTP is', otp)
    }

    const sendTokenToBackend = async (token) => {
        try {
            const response = await fetch('https://api.yourbackend.com/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ otp }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Token successfully sent to the backend:', data);
            } else {
                console.error('Failed to send token:', response.statusText);
            }
        } catch (error) {
            console.error('Error sending token to backend:', error);
        }
    };

    const signIn = async () => {
        const userToken = "example.jwt.token";
        localStorage.setItem("userToken", userToken);
        await sendTokenToBackend(userToken);
        navigate('/Signin');
      };

    return (
        <div className="App">
            <h2 className="word1">VERIFY YOUR ACCOUNT</h2>
            <p id="text">We've sent a vertification email to j******@email.com</p>
            <p id="text">Kindly get OTP on the email to verify your account and log in.</p>
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
            <div className="word">
                <p id="text">Didn’t receive a link? If you’ve already checked your spam folder, you can request to 
                resend the link here after 10 minutes.</p>
            </div>
            <div className='btn-otp-container'>
                <button type='submit' className='btn-otp gray' onClick={getOtpFromLocalStorage}>RE-SEND VERTIFICATION LINK</button>
                <button type='submit' className='btn-otp' onClick={() => {signIn(); fetchOtp()}}>VERIFY </button>
            </div>
        </div>
    );
};
export default Otp;