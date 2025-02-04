import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { Spinner } from "react-bootstrap";
import { check } from "./http/userAPI";
import NavBar from "./components/NavBar";
import authBg from './img/auth_bg.jpg';

const App = observer(() => {
    const {user} = useContext(Context)
    const {realt} = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {

            if (data) {
                user.setIsAuth(true)
                user.setUserName(data.userName)
                user.setEmail(data.email)
                user.setRole(data.role)
            }
            
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        
        <BrowserRouter>

            <div style={{minHeight: '100vh'}}>
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
            </div>

        </BrowserRouter>
    )
})

export default App;