import React from 'react'
import { useState , useContext} from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import {myContext} from './context';


const SignUp = () => {
    const navigate = useNavigate();
    const [show, setshow] = useState(false);
    const [data, setdata] = useState("");    
    const [name, setname] = useState("");


    // const [email, setemail] = useState("");
    // const [password ,setpassword] = useState("");   
    const {email, setemail, password, setpassword} = useContext(myContext)
 
    const handleSubmitSignUp = async () => {
   
        const response = await fetch("http://127.0.0.1:8000/user/signup", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
        });
        console.log(response);
        if (response.status==200) {
            navigate('/');
        } else{
            setshow(true);
            setdata("email exists")
            setname("");
            setemail("");
            setpassword("");
        }
    }
    
    return (
    <div className='container'>
        <div class="signup">
            <input type="text" class="field" id="name" name="name" placeholder="name" value={name} onChange={(e) => setname(e.target.value)}/>
            <input type="text" class="field" id="username" name="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)}/>
            <input type="password" class="field" id="password" name="password" placeholder="password" value = {password} onChange={(e) => setpassword(e.target.value)}/>
            <button class="signup-btn" onClick={handleSubmitSignUp}>SignUp</button>
            {
                show ?
                <div className='msg'><p>{data}</p></div>
                : null
            }
        </div>
    </div>
  )
}

export default SignUp
