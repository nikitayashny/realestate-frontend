import React, { useContext, useState } from "react"
import { Container, Form, Card, Button, ToastContainer, Modal } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts"
import { login, registration, fetchUsers, confirmRegistration, oauth2Login } from "../http/userAPI"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import Notification from "../components/Notification";

const Auth = observer(() => {
    const { user } = useContext(Context)
    const { realt } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const click = async () => {
        try {
            if (!validateEmail(email)) {
                setNotificationMessage("Некорректный формат email");
                setShowNotification(true);
                return;
            }
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(userName, password, email);
            }

            user.setIsAuth(true);
            user.setUserName(data);

            navigate(HOME_ROUTE);

        } catch (e) {
            setNotificationMessage('Неверные данные или нет доступа.');
            setShowNotification(true);
        }
    }

    const handleLoginSuccess = async (response) => {
        try {
            const { credential } = response;

            const data = await oauth2Login(credential)
            user.setIsAuth(true);
            user.setUserName(data);

            navigate(HOME_ROUTE);
            
        } catch (error) {
            setNotificationMessage('Ошибка аутентификации с Google');
            setShowNotification(true);
        }
    };

    return (
        
        <Container className="d-flex justify-content-center align-items-center vh-100">

                <ToastContainer position="top-start" className="p-5">
                    <Notification
                        show={showNotification}
                        message={notificationMessage}
                        color='danger'
                        header='Ошибка'
                        onClose={() => setShowNotification(false)}
                    />
                </ToastContainer>

            <Card style={{ width: 500 }} className="p-5">
                    <h2 className="m-auto">
                        {isLogin ? 'Авторизация' : 'Регистрация'}
                    </h2>
                    <Form className="d-flex flex-column">
                            {isLogin ?
                                <>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите email..."
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите пароль..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </>
                                :
                                <>
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите имя пользователя..."
                                        value={userName}
                                        onChange={e => setUserName(e.target.value)}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите email..."
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                    <Form.Control
                                        className="mt-3"
                                        placeholder="Введите пароль..."
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </>
                            }
                            <div className="d-flex justify-content-between mt-3 mb-3">
                                {isLogin ?
                                    <div>
                                        <NavLink to={REGISTRATION_ROUTE}>У меня нет аккаунта</NavLink>
                                    </div>
                                    :
                                    <div>
                                        <NavLink to={LOGIN_ROUTE}>У меня есть аккаунт</NavLink>
                                    </div>
                                }
                                <Button
                                    onClick={click}
                                >
                                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                                </Button>                             
                            </div>
                            <GoogleLogin
                                onSuccess={handleLoginSuccess}
                            />
                        </Form>
                    </Card>
        </Container>

    )
})

export default Auth;