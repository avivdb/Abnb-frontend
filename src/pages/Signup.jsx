import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { GoogleLogin } from '@react-oauth/google';
import { signup } from '../store/actions/user.actions';
import { ImgUploader } from '../cmps/ImgUploader';
import { userService } from '../services/user';
import { AbnbGradientBtn } from '../cmps/AbnbGradientBtn';
import { handleGoogleResponse, handleGoogleError } from '../services/util.service';

const clientId = "645691889779-la8vv9598g6t4qhg7k12quiil6cqa4uq.apps.googleusercontent.com"; // Replace with your actual Google Client ID

export function Signup() {
    const [credentials, setCredentials] = useState(userService.getEmptyUser());
    const navigate = useNavigate();

    function clearState() {
        setCredentials({ username: '', password: '', fullname: '', imgUrl: '' });
    }

    function handleChange(ev) {
        const { name, value } = ev.target;
        setCredentials({ ...credentials, [name]: value });
    }

    async function onSignup(ev) {
        if (ev) ev.preventDefault();
        if (!credentials.username || !credentials.password || !credentials.fullname) return;
        await signup(credentials);
        clearState();
        navigate('/');
    }

    function onUploaded(imgUrl) {
        setCredentials({ ...credentials, imgUrl });
    }

    return (
        <section className="signup-form">
            <h1>Sign up</h1>
            <h2>Welcome to Abnb</h2>
            <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Fullname"
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <ImgUploader onUploaded={onUploaded} />

            <AbnbGradientBtn handleClick={onSignup} text={"Sign up"} />

            <GoogleLogin
                onSuccess={(response) => handleGoogleResponse(response, navigate, signup)}
                onError={handleGoogleError}
            />
        </section>
    );
}
