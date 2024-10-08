import { Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import RealtItem from '../components/RealtItem';
import { fetchFavorites } from "../http/realtAPI"; 

const FavoritePage = observer(() => {
    const { realt } = useContext(Context)

    return (
        <Container>
            <h1>Избранное</h1>
            <div className="d-flex container vh-90">
              {realt.favorites.map(realt => (
                  <RealtItem key={realt.id} realtItem={realt} />
              ))}
            </div>
        </Container>
    );
});

export default FavoritePage;