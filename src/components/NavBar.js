import React, { useContext } from "react";
import { Context } from "../index";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { NavLink } from "react-router-dom";
import { ADMIN_ROUTE, FAVORITE_ROUTE, LOGIN_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "../utils/consts";
import Button from "react-bootstrap/Button";
import { observer } from "mobx-react-lite";
import {useNavigate} from 'react-router-dom'

const NavBar = observer( () => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const toAdmin = () => {
        if (user.isAdmin === true) {
            navigate(ADMIN_ROUTE)
        } else {
            alert('Нет доступа')
        }
    }

    const toBasket = async () => {
        navigate(FAVORITE_ROUTE)
    }

    const toProfile = async () => {
        navigate(PROFILE_ROUTE)
    }

    return (
        <Navbar bg="light" data-bs-theme="light" expand="md">
    <Container>
        <NavLink style={{color: "black"}} to={HOME_ROUTE}>HomeHub</NavLink>  
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            {user.isAuth ?
                <Nav style={{color: 'black'}}>
                    {user.isAdmin &&
                        <Button variant="outline-dark" onClick={() => toAdmin()} className="mr-2">Админ панель</Button>
                    }
                    <Button variant="outline-dark" onClick={() => toBasket()} className="mr-2">Избранное</Button>    
                    <Button variant="outline-dark" onClick={() => toProfile()} className="mr-2">Личный кабинет</Button>           
                </Nav>
                :
                <Nav style={{color: 'black'}}>
                    <Button variant="outline-dark" onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
        </Navbar.Collapse>
    </Container>
</Navbar>
    )
})

export default NavBar