import React, { useContext, useState } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE, NEWS_ROUTE, CHAT_ROUTE } from "../utils/consts";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const [collapsed, setCollapsed] = useState(true);
    const navigate = useNavigate()

    return (
        <Navbar bg="dark" expand="md">
            <Container>
                <NavLink
                    style={{
                        color: "white",
                        marginRight: "20px",
                        textDecoration: "none",
                        fontSize: "18px"
                    }}
                    to={HOME_ROUTE}
                >
                    RealEstate.by
                </NavLink>
                <NavLink
                    style={{
                        color: "white",
                        textDecoration: "none",
                    }}
                    to={NEWS_ROUTE}
                >
                    Новости
                </NavLink>
                <Navbar.Toggle 
                    aria-controls="navbar-nav" 
                    style={{
                        backgroundColor: '#f8f9fa',
                        borderColor: '#ced4da' 
                    }}
                    onClick={() => setCollapsed(!collapsed)}
                />
                <Navbar.Collapse id="navbar-nav" className="justify-content-end">
                    {user.isAuth ? (
                        <Nav>
                            {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                                <Button
                                    variant="outline-light ms-1"
                                    onClick={() => navigate(ADMIN_ROUTE)}
                                    className="mr-2"
                                >
                                    {!collapsed ? 'Панель администратора' : <i className="fa fa-gear"></i>}
                                </Button>
                            )}
                            <Button
                                variant="outline-light ms-1"
                                onClick={() => navigate(CHAT_ROUTE)}
                                className="mr-2"
                            >
                                {!collapsed ? 'Чаты' : <i className="fa fa-comment"></i>}
                            </Button>
                            <Button
                                variant="outline-light ms-1"
                                onClick={() => navigate(FAVORITE_ROUTE)}
                                className="mr-2"
                            >
                                {!collapsed ? 'Избранное' : <i className="fa fa-heart"></i>}
                            </Button>
                            <Button
                                variant="outline-light ms-1"
                                onClick={() => navigate(PROFILE_ROUTE)}
                                className="mr-2"
                            >
                                {!collapsed ? 'Профиль' : <i className="fa fa-user"></i>}
                            </Button>
                        </Nav>
                    ) : (
                        <Nav>
                            <Button variant="outline-light" onClick={() => navigate(LOGIN_ROUTE)}>
                                Авторизация
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

export default NavBar