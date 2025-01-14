import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const Home = observer(() => {

    const { user } = useContext(Context)

    return (
        <div>
            {user.isAuth 
            ?
            <>
                <div>{user.userName}</div>
                <div>{user.email}</div>
                <div>{user.role}</div>
            </>
            : <></>
            }
            
        </div>
    )
})

export default Home;