import { Card, Col, Image } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { REALT_ROUTE } from "../utils/consts";
import { deleteRealt, fetchRealts } from "../http/realtAPI";
import React, { useContext } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const RealtItem = observer(({realtItem}) => {    // , brand (так было)
    const navigate = useNavigate()
    const {realt} = useContext(Context)
    const {user} = useContext(Context)

    const removeRealt = (event, id) => {
        event.preventDefault(); 
        event.stopPropagation();
        deleteRealt(id)
            .then(data => {
                realt.setRealts(data);
            });
    };
    
    return (
        <Col md={12} className="mt-3" onClick={() => navigate(REALT_ROUTE + '/' + realtItem.id)}>
            <Card style={{cursor: 'pointer', background: "#FFF", height: ""}} border={"dark"}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img style={{height: "280px", width: "100%"}} src={`data:image/jpeg;base64,${realtItem.images[0].bytes}`} alt="Image" />    
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{realtItem.name}</h5>   
                            <p className="card-text">{realtItem.dealType.id === 1 ? `${realtItem.price} $/мес.`  : realtItem.dealType.id === 2 ? `${realtItem.price} $.` : null}</p>
                            <p className="card-text">{realtItem.type.id === 1 ? `Квартира ${realtItem.area} м²`  : realtItem.type.id === 2 ? `Дом ${realtItem.area} м²` : null}</p>
                            <p className="card-text">{`Количество комнат: ${realtItem.roomsCount}`}</p>
                            <p className="card-text">{`${realtItem.country}, г. ${realtItem.city}, ул.${realtItem.street}, д.${realtItem.house}`}</p> 
                        </div>
                        {(user.isAuth && user.userId === realtItem.user.id)
                        ?
                            <div className="text-end m-3">
                                <button onClick={(event) => removeRealt(event, realtItem.id)} class="btn btn-danger">Удалить объявление</button>
                            </div>
                        :
                        <></>
                        }
                        
                    </div>
                </div>
            </Card>          
        </Col>
    )
})

export default RealtItem