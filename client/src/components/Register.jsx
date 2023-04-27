import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../fetch_req';
import Header from './Header';
import Footer from './Footer';

function Register(){
    const navigate = useNavigate();
    const [btnName, setBtnName] = useState("");
    const [response, setResponse] = useState("");

    async function handleSubmit(e){
        e.preventDefault();

        const { username, password } = e.target;
        const userInfo = {
            username: username.value,
            password: password.value
        };

        const serverResponse = btnName === "register" ? await registerUser(userInfo) : await loginUser(userInfo);
        
        if(serverResponse.success){
            sessionStorage.setItem('user', JSON.stringify(serverResponse.user));
            navigate('../Home');
        }
        setResponse(serverResponse.message);

    }

    function handleBtnClick(e){
        setBtnName(e.target.name);
    }
    
    return (
        <Fragment>
            <Header />
            <div className='form-container'>
                <form className='text-center form-signin' onSubmit={handleSubmit}>
                    <h1 className='text-center h3 mb-3 fw-normal'>Register</h1>
                    <h2>{response}</h2>
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
            </div>
            <Footer />
        </Fragment>
    )
}

export default Register;