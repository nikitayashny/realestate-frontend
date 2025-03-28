import React, { useContext, useState } from "react"
import { Container, Form, Card, Button, Modal } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts"
import { login, registration, fetchUsers, confirmRegistration, oauth2Login, getSubscription } from "../http/userAPI"
import { observer } from "mobx-react-lite"
import { Context } from "../index"
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { notification } from "antd";
import authBg from '../img/auth_bg.jpg';
import { fetchFavorites } from "../http/realtAPI"

const Auth = observer(() => {
    const { user } = useContext(Context)
    const { realt } = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    const [showModal, setShowModal] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const click = async () => {
        try {
            if (!validateEmail(email)) {
                notification.error({
                    message: 'Ошибка',
                    description: 'Некорректный формат email',
                    placement: 'bottomLeft'
                });
                return;
            }
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                await registration(userName, password, email);
                setShowModal(true);
                return;
            }

            user.setIsAuth(true)
            user.setUserName(data.userName)
            user.setEmail(data.email)
            user.setRole(data.role)
            user.setUserId(data.userId)

            fetchFavorites().then(data => {  
                                realt.setFavorites(data);
                            });

            getSubscription().then(data => {
                                user.setSubscription(data);
                            })

            if (data.role === 'ADMIN' || data.role === "SUPER_ADMIN") {
                fetchUsers().then(users => {
                    user.setUsers(users);
                });
            }

            navigate(HOME_ROUTE);

        } catch (e) {
            notification.error({
                message: 'Ошибка',
                description: 'Неверные данные или нет доступа.',
                placement: 'bottomLeft'
            });
        }
    }

    const handleLoginSuccess = async (response) => {
        try {
            const { credential } = response;

            const data = await oauth2Login(credential)

            user.setIsAuth(true)
            user.setUserName(data.userName)
            user.setEmail(data.email)
            user.setRole(data.role)
            user.setUserId(data.userId)

            fetchFavorites().then(data => {  
                                realt.setFavorites(data);
                            });

            getSubscription().then(data => {
                                user.setSubscription(data);
                            })

            if (data.role === 'ADMIN' || data.role === "SUPER_ADMIN") {
                fetchUsers().then(users => {
                    user.setUsers(users);
                });
            }

            navigate(HOME_ROUTE);
            
        } catch (error) {
            notification.error({
                message: 'Ошибка',
                description: 'Ошибка аутентификации с Google',
                placement: 'bottomLeft'
            });
        }
    };

    const handleConfirmCode = async () => {
        try {
            const data = await confirmRegistration(confirmationCode, userName, password, email);
            
            user.setIsAuth(true)
            user.setUserName(data.userName)
            user.setEmail(data.email)
            user.setRole(data.role)
            user.setUserId(data.userId)

            fetchFavorites().then(data => {  
                                realt.setFavorites(data);
                            });

            getSubscription().then(data => {
                                user.setSubscription(data);
                            })

            if (data.role === 'ADMIN' || data.role === "SUPER_ADMIN") {
                fetchUsers().then(users => {
                    user.setUsers(users);
                });
            }

            navigate(HOME_ROUTE);
            setShowModal(false); 
        } catch (e) {
            notification.error({
                message: 'Ошибка',
                description: 'Неверный код подтверждения',
                placement: 'bottomLeft'
            });
        }
    };

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            <div
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%) blur(2px)",
                    position: 'absolute',    
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
            />
        <Container className="d-flex justify-content-center align-items-center vh-100">

            <Card style={{ width: 500, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)" }} className="p-5">
                    <h2 className="m-auto mb-3">
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
                                    variant="dark"
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Код подтверждения</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        placeholder="Введите код подтверждения"
                        value={confirmationCode}
                        onChange={e => setConfirmationCode(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleConfirmCode}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
})

export default Auth;