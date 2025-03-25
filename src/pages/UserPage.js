import { Container, Row, Button, Modal} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from "../http/userAPI";
import { fetchUsersRealts } from "../http/userAPI";
import RealtCard from "../components/RealtCard";
import SockJS from "sockjs-client";
import { Client } from '@stomp/stompjs';
import { Context } from "..";

const UserPage = observer(() => {
    
    const {user} = useContext(Context)
    const [ userProfile, setUserProfile] = useState({});
    const { id } = useParams();
    const [realts, setRealts] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [message, setMessage] = useState("");
    const [client, setClient] = useState(null);

    useEffect(() => {
        fetchUser(id).then(data => setUserProfile(data))
        
        fetchUsersRealts(id).then(data => {  
            setRealts(data);
         });
    }, [id]);

    useEffect(() => {
        if (user.isAuth) {
            const socket = new SockJS("https://localhost:8443/ws");
            const stompClient = new Client({
                webSocketFactory: () => socket,
                onWebSocketError: (error) => {
                    console.error("WebSocket error:", error);
                },
            });
            
            stompClient.activate();
            setClient(stompClient);

            return () => {
                stompClient.deactivate();
            };
        }
    }, []);

    const handleSendMessage = () => {
        if (client && client.connected) {
            if (message.trim() && userProfile) {
                const newMessage = {
                    senderId: user.userId,
                    recipientId: userProfile.id,
                    senderName: user.userName,
                    recipientName: userProfile.username,
                    content: message,
                    timestamp: new Date(),
                };

                client.publish({
                    destination: "/app/chat",
                    body: JSON.stringify(newMessage),
                });

                setMessage("");
                setShowModal(false); 
            }
        } else {
            console.error("STOMP client is not connected.");
        }
    };

    return (
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-4">{userProfile.username}</h4>
                {user.isAuth 
                ?
                <div className="ms-2">
                    <Button variant="outline-dark" className="ms-2" onClick={() => setShowModal(true)}>
                        Написать
                    </Button>
                </div>
                : 
                null}
            </div>

            <p>Email: <span>{userProfile.email}</span></p>
            <hr></hr>
            <h4>Товары пользователя:</h4>

            <Row className="vh-90">
                {realts.map(realt => (
                    <RealtCard key={realt.id} realtItem={realt} />
                ))}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Ваше сообщение</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea 
                        rows="4" 
                        className="form-control" 
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                        placeholder="Введите ваше сообщение..." 
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={handleSendMessage}>
                        Отправить
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
});

export default UserPage;