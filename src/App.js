import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from "./index";
import { check, fetchUsers } from "./http/userAPI"
import { Spinner } from "react-bootstrap";
import { fetchRealts, fetchFavorites } from "./http/realtAPI";

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

    useEffect(() => {
        fetchRealts(realt.limit, realt.page, realt.selectedType, realt.selectedDealType, 0).then(data => {  
          realt.setRealts(data.realts)
          realt.setTotalCount(data.totalCount)
        })
      }, [realt.page, realt.selectedType, realt.selectedDealType])

    if (loading) {
        return <Spinner animation={"grow"} />
    }

    return (
        
        <BrowserRouter>
            <NavBar />
            <AppRouter />
            <Footer />
        </BrowserRouter>
    )
})

export default App;