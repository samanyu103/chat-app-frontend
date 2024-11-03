import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import {myContext} from './context';


const Login = () => {
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        navigate('/signup');
    };

    const {senderName, setsenderName, email, setemail, password, setpassword} = useContext(myContext)
    const [show, setshow] = useState(false);
    const [data, setdata] = useState("");

    function clearData() {
        setsenderName("");
        setemail("");
        setpassword("");
    }

    const handleSubmitLogin = async () => {
   
        const response = await fetch("http://127.0.0.1:8000/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
        credentials: "include",
        });
        // console.log(response);
        // const resp = await response.json();
        // console.log(resp);
        const result = await response.json();
        console.log(result);
        if (response.status == 200) {
            // here the global name is set
            setsenderName(result.name);
            navigate('/dashboard');
            setshow(true);
            setdata(`Welcome ${result.name}`);
        }else{
            console.log(result.msg);
            if (result.msg == "user not found") {
                console.log("not found");
                setshow(true);
                setdata("invalid email");
                clearData();
            } else if (result.msg == "incorrect password") {
                setshow(true);
                setdata("invalid password");
                clearData();
            }

        }
    }

    useEffect(() => {
        clearData();
    }, []);

    
    return (

    <div className='container'>
        <div class="whatup">
        <p class="writing">
            <span class="what">What's</span>
            <span class="up">Up</span>
        </p>
        </div>

        <div class="login_box">
            <div class="form">
                <input type="email" class="field" id="username" name="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)}/>
                <input type="password" class="field" id="password" name="password" placeholder="password" value = {password} onChange={(e) => setpassword(e.target.value)}/>
                <button class="btn" id="login" onClick={handleSubmitLogin}>LogIn</button>
                <p class="or">OR</p>
                <button class="btn" id="signup" onClick={handleClickSignUp}>Sign Up</button>

                {
                show ?
                <div className='msg'><p>{data}</p></div>
                : null
                }
            </div> 
  
        </div>




{/* 
    <div>
        <h1>Login</h1>
        <div className="form-div">
            <label>Email: </label>
            <input type="text" name = "email" value={email} onChange={(e) => setemail(e.target.value)}/>
            <label>Password: </label>
            <input type="text" name = "password" value = {password} onChange={(e) => setpassword(e.target.value)}/>
            <button onClick={handleSubmitLogin}>Submit</button>
        </div>
    </div> */}

    </div>
  )
}

export default Login
