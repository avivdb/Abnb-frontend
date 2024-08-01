import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { login } from '../store/actions/user.actions';
import { AbnbGradientBtn } from '../cmps/AbnbGradientBtn';
import { handleGoogleResponse, handleGoogleError } from '../services/util.service';

// const clientId = "645691889779-la8vv9598g6t4qhg7k12quiil6cqa4uq.apps.googleusercontent.com"; // Replace with your actual Google Client ID

export function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    async function onLogin(ev) {
        if (ev) ev.preventDefault();
        if (!credentials.username || !credentials.password) return;
        await login(credentials);
        navigate('/');
    }

    function handleChange(ev) {
        const { name, value } = ev.target;
        setCredentials({ ...credentials, [name]: value });
    }

    return (
        <section className="login-form">
            <h1>Log in</h1>
            <h2>Welcome back</h2>

            <section className="user-info-login">
                <input name="username" value={credentials.username} onChange={handleChange} placeholder="Username" />
                <input type="password" name="password" value={credentials.password} onChange={handleChange} placeholder="Password" />
            </section>

            <AbnbGradientBtn handleClick={onLogin} text={"Login"} />

            <GoogleLogin
                onSuccess={(response) => handleGoogleResponse(response, navigate, login)}
                onError={handleGoogleError}
            />
        </section>
    )
}
