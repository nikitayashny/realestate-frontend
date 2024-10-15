import { Container, Button, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import RealtList from '../components/RealtList';
import AddRealtModal from '../components/modals/AddRealtModal'; 
import {  fetchUsersRealts } from "../http/realtAPI";
import RealtItem from "../components/RealtItem";

const Home = observer(() => {
    const { user } = useContext(Context);
    const [showModal, setShowModal] = useState(false); 
    const {realt} = useContext(Context)

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        user.setUserId(null);
        user.setUserName(null);
        user.setUsers([]);
        realt.setUsersRealts([])
        realt.setSelectedType(0)
        realt.setSelectedDealType(0)
    };
    
    useEffect(() => {
        if (user.userId) {
            fetchUsersRealts(user.userId).then(data => {  
                realt.setUsersRealts(data);
            });
        }
    }, [user.userId, realt]);

    return (
        <Container>
            <div className="d-flex justify-content-between align-items-center mt-2">
                <h3 className="mb-4">{user.userName}</h3>
                <div className="ms-2">
                    <Button variant="primary" onClick={() => setShowModal(true)}>
                        Добавить объявление
                    </Button>
                    <Button variant="outline-dark" onClick={logOut} className="ms-2">Выйти</Button>
                </div>
            </div>

            <Row className="d-flex container vh-90">
                {realt.usersRealts.map(realt => (
                    <RealtItem key={realt.id} realtItem={realt} />
                ))}
            </Row>
            <AddRealtModal show={showModal} onHide={() => setShowModal(false)} />
        </Container>
    );
});

export default Home;