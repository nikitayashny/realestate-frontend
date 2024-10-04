import { Container} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from "../http/userAPI";
import RealtList from "../components/RealtList";

const UserPage = observer(() => {

    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchUser(id).then(data => setUser(data));
    }, [id]);

    return (
        <Container>
            <h3>{user.firstName + ' ' + user.lastName}</h3>

            <p>Номер телефона: <span>{user.phoneNumber}</span></p>
            <p>Email: <span>{user.login}</span></p>
            <hr></hr>
            <h4>Товары пользователя:</h4>

            <RealtList userId={user.id}/>
        </Container>
    );
});

export default UserPage;