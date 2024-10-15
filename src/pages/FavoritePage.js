import { Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useEffect } from "react";
import RealtItem from '../components/RealtItem';
import { fetchFavorites } from "../http/realtAPI";

const FavoritePage = observer(() => {
    const { realt } = useContext(Context)
    const { user } = useContext(Context)

    useEffect(() => {
        if (user.userId) {
            fetchFavorites(user.userId).then(data => {  
                realt.setFavorites(data);
            });
        }
    }, [user.userId, realt]);

    return (
        <Container>
            <h3>Избранное</h3>
            <Row className="d-flex container vh-90">
              {realt.favorites.map(realt => (
                  <RealtItem key={realt.id} realtItem={realt} />
              ))}
            </Row>
        </Container>
    );
});

export default FavoritePage;