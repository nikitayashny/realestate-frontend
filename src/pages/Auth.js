import React, { useContext, useState } from "react";
import { Container, Form, Card, Button, ToastContainer } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "../utils/consts";
import { login, registration, fetchUsers } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import {useNavigate} from 'react-router-dom'
import Notification from "../components/Notification";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');

    const click = async () => {
        try {
            if (!validateEmail(email))
            {
                setNotificationMessage("Некорректный формат email");
                setShowNotification(true)
                return
            }
            let data
            if (isLogin) {
                data = await login(email, password)
            } else {
                data = await registration(firstName, lastName, email, phoneNumber, password)
            }
            
            user.setUserName(data.name)
            user.setIsAuth(true)
            user.setUserId(data.id)
            if (data.role === 'ADMIN') {
                user.setIsAdmin(true)
                fetchUsers().then(data => {
                    user.setUsers(data)
                })      
            }
               
            navigate(HOME_ROUTE)
        } catch(e) {
            setNotificationMessage('Неверные данные или нет доступа.')
            setShowNotification(true);       
        }
    }

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailPattern.test(email)) {
            return false;
        } else {
            return true
        }
    };

    return (
        
        <Container 
            className="d-flex justify-content-center align-items-center"
            style={{height: "90vh"}}
        >
            <ToastContainer position="bottom-start" className="p-5">
                <Notification
                    show={showNotification}
                    message={notificationMessage}
                    onClose={() => setShowNotification(false)}
                />
            </ToastContainer>

            <Card style={{width: 600}} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
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
                        placeholder="Введите ваш имя..."
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
                        placeholder="Введите ваш номер телфеона..."
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
                                <NavLink to={REGISTRATION_ROUTE}>У меня нет аккаунта</NavLink>
                            </div>                        
                            :
                            <div>
                                <NavLink to={LOGIN_ROUTE}>У меня есть аккаунт</NavLink>
                            </div>  
                            }
                        <Button 
                            variant="outline-success"
                            onClick={click}
                            >
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    )
})

export default Auth;
