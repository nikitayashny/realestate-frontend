import { Container, Button, Row, Col, Card, CardBody } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import { fetchUsersRealts } from "../http/userAPI";
import RealtCard from "../components/RealtCard";
import UserFilterModal from "../components/modals/UserFilterModal"
import AddRealtModal from "../components/modals/AddRealtModal";

const Profile = observer(() => {
    const { user } = useContext(Context)
    const {realt} = useContext(Context)
    const [showModal, setShowModal] = useState(false)
    const [showUserFilterModal, setShowUserFilterModal] = useState(false)

    const logOut = () => {
        localStorage.removeItem('token');
        user.setIsAuth(false);
        user.setUserName(null);
        user.setRole(null)
        user.setEmail(null)
        user.setUserId(null)
        user.setUsers(null)
        realt.setUsersRealts(null)
        realt.setFavorites(null)
        realt.setSelectedType(0)
        realt.setSelectedDealType(0)
        realt.setRoomsCount(0)
        realt.setMaxPrice(-1)
        realt.setSortType(1)
        realt.setPage(1)
    };
    
    useEffect(() => {
        if (user.userId) {
            fetchUsersRealts(user.userId).then(data => {  
                realt.setUsersRealts(data);
            });
        }
    }, [user.userId, realt]);

    return (
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5"  style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-4">{user.userName}</h4>
                <div className="ms-2">
                    <Button variant="outline-dark" onClick={() => setShowUserFilterModal(true)}>
                        Мои пожелания
                    </Button>
                    <Button variant="outline-dark" onClick={() => setShowModal(true)} className="ms-2">
                        Добавить объявление
                    </Button>
                    <Button variant="dark" onClick={logOut} className="ms-2">Выйти</Button>
                </div>
            </div>
            <hr></hr>
            <h4 className="text-center">Мои объявления</h4>          
            <Row className="vh-90">
                {realt.usersRealts && realt.usersRealts.map(realt => (
                    <Row key={realt.id}>
                        <Col md={9}>
                            <RealtCard realtItem={realt} />
                        </Col>
                        <Col md={3} className="mt-3">
                            <Card bg="light">
                                <CardBody>
                                    <Row>
                                        <Col md={9}>
                                            <div>просмотров </div>
                                            <div>добавлений в избранное</div>
                                            <div>копирований ссылки</div>  
                                        </Col>
                                        <Col md={3}>
                                            <div>{realt.views}</div>
                                            <div>{realt.likes}</div>
                                            <div>{realt.reposts}</div>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>                  
                    </Row>               
                ))}
            </Row>
            <AddRealtModal show={showModal} onHide={() => setShowModal(false)} />
            <UserFilterModal show={showUserFilterModal} onHide={() => setShowUserFilterModal(false)} />
        </Container>
        </div>
    );
});

export default Profile;