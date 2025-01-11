import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const GoogleLoginComponent = () => {
    const [userInfo, setUserInfo] = useState(null);

    const handleLoginSuccess = async (response) => {
        try {
            const { credential } = response;
            const result = await axios.post('http://localhost:8080/api/auth/oauth2', { token: credential });
            setUserInfo(result.data);
        } catch (error) {
            console.error('Ошибка аутентификации с Google', error);
        }
    };

    const handleLoginFailure = (error) => {
        console.error('Ошибка аутентификации', error);
    };

    return (
        <div>
            <h1>Вход через Google</h1>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
            />
            {userInfo && (
                <div>
                    <h2>Привет, {userInfo}!</h2>
                    <p>Email: {userInfo.email}</p>
                </div>
            )}
        </div>
    );
};

export default GoogleLoginComponent;
