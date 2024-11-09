import React, { useContext, useState } from "react";
import { Container, Form, Card, Button, ToastContainer, Modal } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts";
import { login, registration, fetchUsers, confirmRegistration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import Notification from "../components/Notification";
import { fetchFavorites } from "../http/realtAPI";
import authBg from '../img/auth_bg.jpg';

const Auth = observer(() => {
    const { user } = useContext(Context);
    const { realt } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    
    const [showModal, setShowModal] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');

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
                await registration(firstName, lastName, email, phoneNumber, password);
                setShowModal(true);
                return;
            }

            user.setUserName(data.name);
            user.setIsAuth(true);
            user.setUserId(data.id);

            fetchFavorites(data.id).then(favorites => {
                realt.setFavorites(favorites);
            });

            if (data.role === 'ADMIN') {
                user.setIsAdmin(true);
                fetchUsers().then(users => {
                    user.setUsers(users);
                });
            }

            navigate(HOME_ROUTE);

        } catch (e) {
            setNotificationMessage('Неверные данные или нет доступа.');
            setShowNotification(true);
        }
    };

    const handleConfirmCode = async () => {
        try {
            const data = await confirmRegistration(confirmationCode, firstName, lastName, email, phoneNumber, password);
            user.setUserName(data.name);
            user.setIsAuth(true);
            user.setUserId(data.id);

            fetchFavorites(data.id).then(favorites => {
                realt.setFavorites(favorites);
            });

            navigate(HOME_ROUTE);
            setShowModal(false); 
        } catch (e) {
            setNotificationMessage('Неверный код подтверждения.');
            setShowNotification(true);
        }
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    backgroundImage: `url(${authBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "grayscale(100%)",
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                }}
            />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ height: "83.947vh" }}
            >
                <ToastContainer position="bottom-start" className="p-5">
                    <Notification
                        show={showNotification}
                        message={notificationMessage}
                        onClose={() => setShowNotification(false)}
                    />
                </ToastContainer>

                <Card style={{ width: 600, backgroundColor: 'rgba(0, 0, 0, 0.7)' }} className="p-5">
                    <h2 className="m-auto" style={{ color: 'white' }}>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className="d-flex flex-column">
                        {isLogin ?
                            <>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваш email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваш пароль..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                            </>
                            :
                            <>
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваше имя..."
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите вашу фамилию..."
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваш email..."
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваш номер телефона..."
                                    value={phoneNumber}
                                    onChange={e => setPhoneNumber(e.target.value)}
                                />
                                <Form.Control
                                    className="mt-3"
                                    placeholder="Введите ваш пароль..."
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    type="password"
                                />
                            </>
                        }
                        <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
                            {isLogin ?
                                <div>
                                    <NavLink style={{ color: 'white' }} to={REGISTRATION_ROUTE}>У меня нет аккаунта</NavLink>
                                </div>
                                :
                                <div>
                                    <NavLink style={{ color: 'white' }} to={LOGIN_ROUTE}>У меня есть аккаунт</NavLink>
                                </div>
                            }
                            <Button
                                variant="outline-light"
                                onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Зарегистрироваться'}
                            </Button>
                        </div>
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
    );
});

export default Auth;