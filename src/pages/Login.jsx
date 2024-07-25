import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { userService } from '../services/user'
import { login } from '../store/actions/user.actions'
import { AbnbGradientBtn } from '../cmps/AbnbGradientBtn'

export function Login() {

    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })

    const navigate = useNavigate()

    async function onLogin(ev = null) {
        if (ev) ev.preventDefault()

        if (!credentials.username) return
        await login(credentials)
        navigate('/')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    return (
        <section className="login-form">
            <h1>Log in</h1>
            <h2>Welcome back</h2>
            
            <section className="user-info-login">
            <input name="username" value={credentials.username} onChange={handleChange} placeholder="Username"/>
            <input name="password" value={credentials.password} onChange={handleChange} placeholder="Password"/>
            </section>

            <AbnbGradientBtn handleClick={onLogin} text={"Login"}/>
        </section>
    )
}