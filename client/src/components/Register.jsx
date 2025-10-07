import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../fetch_req';
import Header from './Header';
import Footer from './Footer';
import { useUser } from '../context/UserContext.jsx';

function Register(){
    const [btnName, setBtnName] = useState("");
    const [serverResponse, setServerResponse] = useState("");
    const { setUser } = useUser();

    useEffect(() => {
        if(serverResponse) {
          setServerResponse(serverResponse);
          const timer = setTimeout(() => {
            setServerResponse("");
          }, 5000);
    
          return () => clearTimeout(timer);
        }
      },[serverResponse]);

    async function handleSubmit(event){
        
        event.preventDefault();

        const { username, password } = event.target;
        const userInfo = {
            username: username.value,
            password: password.value
        };
        try{
            const user = btnName === "register" ? await registerUser(userInfo) : await loginUser(userInfo);
            setUser(user);
        }
        catch(err){
            setServerResponse(err.message);
        }
    }

    function handleBtnClick(event){
        setBtnName(event.target.name);
    }
    
    return (
        <Fragment>
            <Header />
            <div className='form-container'>
                <form className='text-center form-signin' onSubmit={handleSubmit}>
                    <h1 className='text-center h3 mb-3 fw-normal'>Register</h1>
                    <div className='form-floating'>
                        <input className='form-control' defaultValue="user1" type='username' name="username" id='floatingUsername' placeholder="username"/>
                        <label htmlFor='floatingUsername'>Username </label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' defaultValue="123" type="password" name="password" id='floatingPassword' placeholder="password"/>
                        <label htmlFor='floatingPassword'>Password </label>
                    </div>
                    <div className='d-grid gap-2 d-md-block'>
                        <button className='btn btn-primary m-1' onClick={handleBtnClick} name="register" type="submit">Register</button>
                        <button className='btn btn-primary m-1' onClick={handleBtnClick} name="login" type="submit">Log-In</button>
                    </div>
                </form>
                <h2 id='error-response'>{serverResponse}</h2>
            </div>
            <Footer />
        </Fragment>
    )
}

export default Register;