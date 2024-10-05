import { Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import RealtItem from '../components/RealtItem';
import { fetchFavorites } from "../http/realtAPI"; 

const FavoritePage = observer(() => {
    const { user } = useContext(Context); 
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
      fetchFavorites(user.userId).then(data => {  
          setFavorites(data);
      });
    }, [user.userId]);

    return (
        <Container>
            <Row className="d-flex container vh-90">
              {favorites.map(realt => (
                  <RealtItem key={realt.id} realtItem={realt} />
              ))}
            </Row>
        </Container>
    );
});

export default FavoritePage;