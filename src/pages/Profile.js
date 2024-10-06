import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState } from "react";
import RealtList from '../components/RealtList';
import AddRealtModal from '../components/modals/AddRealtModal'; 

const Home = observer(() => {
    const { user } = useContext(Context);
    const { realt } = useContext(Context)
    const [showModal, setShowModal] = useState(false); 

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        user.setUserId(null);
        user.setUserName(null);
    };

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

            <RealtList userId={user.userId} />
            <AddRealtModal show={showModal} onHide={() => setShowModal(false)} />
        </Container>
    );
});

export default Home;