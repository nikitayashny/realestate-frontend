import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check, fetchUsers } from "./http/userAPI"
import { Spinner } from "react-bootstrap";
import { fetchFavorites } from "./http/realtAPI";
import authBg from './img/auth_bg.jpg';

const App = observer(() => {
    const {user} = useContext(Context)
    const {realt} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUserName(data.name)
                user.setUser(true)
                user.setIsAuth(true)
                if (data.role === 'ADMIN') {
                    user.setIsAdmin(true)  
                    fetchUsers().then(data => {
                        user.setUsers(data)
                    })              
                }
                user.setUserId(data.id)
                fetchFavorites(data.id).then(data => {  
                    realt.setFavorites(data);
                });
            }
            
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        
        <BrowserRouter>
            <NavBar />
            <div style={{ position: 'relative'}}>
                <div 
                    style={{
                        backgroundImage: `url(${authBg})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        filter: "grayscale(100%)",
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: -1,
                    }}
                />
                <AppRouter />
            </div>
            <Footer />
        </BrowserRouter>
    )
})

export default App;