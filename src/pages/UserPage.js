import { Container, Row} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from "../http/userAPI";
import { fetchUsersRealts } from "../http/userAPI";
import RealtCard from "../components/RealtCard";


const UserPage = observer(() => {

    const [user, setUser] = useState({});
    const { id } = useParams();
    const [realts, setRealts] = useState([])

    useEffect(() => {
        fetchUser(id).then(data => setUser(data))
        
        fetchUsersRealts(id).then(data => {  
            setRealts(data);
         });
    }, [id]);

    return (
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <h4>{user.username}</h4>

            <p>Email: <span>{user.email}</span></p>
            <hr></hr>
            <h4>Товары пользователя:</h4>

            <Row className="vh-90">
                {realts.map(realt => (
                    <RealtCard key={realt.id} realtItem={realt} />
                ))}
            </Row>
        </Container>
    );
});

export default UserPage;