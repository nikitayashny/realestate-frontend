import { Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useEffect } from "react";
import RealtCard from '../components/RealtCard';
import { fetchFavorites } from "../http/realtAPI";
import MapFavorite from "../components/MapFavorite";

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
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{ background: "white", borderRadius: "20px", padding: "20px"}}>
            <h4>Избранное</h4>
        
            <Row className="vh-90 mb-3">
              {realt.favorites.map(realt => (
                  <RealtCard key={realt.id} realtItem={realt} />
              ))}
            </Row>
            <MapFavorite realts={realt.favorites}/>
        </Container>
        </div>
    );
});

export default FavoritePage;