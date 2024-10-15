import { Container, Row} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from "../http/userAPI";
import { fetchUsersRealts } from "../http/realtAPI";
import RealtItem from "../components/RealtItem";

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
        <Container>
            <h3>{user.firstName + ' ' + user.lastName}</h3>

            <p>Номер телефона: <span>{user.phoneNumber}</span></p>
            <p>Email: <span>{user.login}</span></p>
            <hr></hr>
            <h4>Товары пользователя:</h4>

            <Row className="d-flex container vh-90">
                {realts.map(realt => (
                    <RealtItem key={realt.id} realtItem={realt} />
                ))}
            </Row>
        </Container>
    );
});

export default UserPage;