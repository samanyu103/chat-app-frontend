import React from 'react'
import Login from './login';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();

    const handleClickGetData = () => {
        navigate('/getdata');
      };
      const handleClickSignUp = () => {
        navigate('/signup');
      };
  return (
    <div>
        <Login/>
        <button onClick={handleClickGetData}>Get Data</button>
        <button onClick={handleClickSignUp}>Sign Up</button>
    </div>
  )
}

export default Home
