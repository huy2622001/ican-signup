import './App.css';
import {Routes, Route} from 'react-router-dom'

import IcanSignup from './Components/IcanSignup/IcanSignup';
import IcanSignin from './Components/IcanSignin/IcanSignin';
import IcanOtp from './Components/IcanOtp/IcanOtp'

function App() {

  return (
    <Routes>
      <Route path='/' element={<IcanSignup/>} />
      <Route path='/Otp' element={<IcanOtp/>} />
      <Route path='/Signin' element={<IcanSignin/>} />      
    </Routes>
  );
}

export default App;