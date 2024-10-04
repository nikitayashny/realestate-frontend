import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneRealt } from "../http/realtAPI";
import { observer } from "mobx-react-lite";
import { Carousel } from "react-bootstrap";
//import {useNavigate} from 'react-router-dom'
import { USER_ROUTE } from "../utils/consts";

const RealtPage = observer(() => {
    //const navigate = useNavigate()
    const [realt, setRealt] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchOneRealt(id).then(data => setRealt(data));
    }, [id]);

    return (
        <Container className="mt-3">
            <div className="row">
                <div className="col-md-6">
                    <Carousel>
                        {realt.images && realt.images.length > 0 ? (
                            realt.images.map((image) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        style={{width: "600px", height: "400px", objectFit: "cover"}}
                                        src={`data:image/jpeg;base64,${image.bytes}`}
                                        alt={`Изображение`}
                                    />
                                </Carousel.Item>
                            ))
                        ) : (
                            <></>
                        )}
                    </Carousel>
                </div>
                <div className="col-md-6">
                    <div className="card position-relative">
                        <div className="card-body">
                            <h3 className="card-title">
                                <span>{realt.name}</span>
                            </h3>
                            <p className="card-text">
                                {realt.dealType?.id === 1 ? `${realt.price} $/мес.` : 
                                 realt.dealType?.id === 2 ? `${realt.price} $` : null}
                            </p>
                            <p className="card-text">
                                {realt.type?.id === 1 ? `Квартира ${realt.area} м²` : 
                                 realt.type?.id === 2 ? `Дом ${realt.area} м²` : null}
                            </p>
                            <p className="card-text">{`Количество комнат: ${realt.roomsCount}`}</p>
                            <p className="card-text">{`${realt.country}, г. ${realt.city}, ул.${realt.street}, д.${realt.house}`}</p>
                            <p className="card-text">
                                {'Автор: '} 
                                {realt.user 
                                ?
                                    <a href={USER_ROUTE + '/' + realt.user.id}>{`${realt.user.firstName} ${realt.user.lastName}`}</a>
                                : 
                                <>{'Загрузка...'}</>
                                }
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12">
                                <h5 className="card-title">Описание:</h5>
                                <p className="card-text">
                                    <span>{realt.article}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
});

export default RealtPage;