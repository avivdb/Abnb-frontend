import { Outlet } from 'react-router';
import { GoogleOAuthProvider } from '@react-oauth/google';

const clientId = '645691889779-la8vv9598g6t4qhg7k12quiil6cqa4uq.apps.googleusercontent.com'; // Replace with your actual Google Client ID

export function LoginSignup() {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="login-page">
                <Outlet />
            </div>
        </GoogleOAuthProvider>
    );
}
