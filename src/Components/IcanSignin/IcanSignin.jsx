import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './IcanSignin.css'

import yellow_splash from '../Assets/yello splash 1.png'
import purple_brush from '../Assets/purple brush 1.png'

const IcanSignin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resonse, setResponse] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('http://192.168.1.20:3001/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.text())
      .then(data => setResponse(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='int1'>
          <img src={yellow_splash} alt="" className='splash' />
        </div>
        <div className='txt'>YOU'RE ALL SET!</div>
        <p id='text_word'>Please login by your account.</p>
        <form className='inputs' onSubmit={handleSubmit}>
          <div className='input'>
            <input type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          </div>
          <br />
          <div className='input'>
            <input type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          </div>
          <br />
          <div className='btn-container'>
            <button type='btn' className='btn gray' onClick={() => navigate("")}>SIGN IN</button>
            <p>{resonse}</p>
            <div className='text_2'>Forgot password?</div>
          </div>
        </form>
        <div className='int_2'>
          <img src={purple_brush} alt="" id='brush' />
        </div>
      </div>
    </div>
  )
}

export default IcanSignin
