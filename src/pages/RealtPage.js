import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneRealt, addToFavorites, deleteFromFavorites } from "../http/realtAPI";
import { observer } from "mobx-react-lite";
import { Carousel } from "react-bootstrap";
import { USER_ROUTE } from "../utils/consts";
import { Context } from "..";

const RealtPage = observer(() => {
    const [realtItem, setRealt] = useState({});
    const { id } = useParams();
    const {realt} = useContext(Context)
    const {user} = useContext(Context)

    useEffect(() => {
        fetchOneRealt(id).then(data => setRealt(data));
    }, [id]);

    const addFavorite = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        const params = {
            userId: user.userId,
            realtId: id
        };
        addToFavorites(params)
        .then(data => {  
            realt.setFavorites(data);
        });
    };

    const deleteFavorite = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        const params = {
            userId: user.userId,
            realtId: id
        };
        deleteFromFavorites(params)
        .then(data => {  
            realt.setFavorites(data);
        });
    };

    return (
        <Container className="mt-3">
            <div className="row">
                <div className="col-md-6">
                    <Carousel>
                        {realtItem.images && realtItem.images.length > 0 ? (
                            realtItem.images.map((image) => (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        style={{ width: "600px", height: "400px", objectFit: "cover" }}
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
                                <span>{realtItem.name}</span>
                            </h3>
                            <p className="card-text">
                                {realtItem.dealType?.id === 1 ? `${realtItem.price} $/мес.` :
                                    realtItem.dealType?.id === 2 ? `${realtItem.price} $` : null}
                            </p>
                            <p className="card-text">
                                {realtItem.type?.id === 1 ? `Квартира ${realtItem.area} м²` :
                                    realtItem.type?.id === 2 ? `Дом ${realtItem.area} м²` : null}
                            </p>
                            <p className="card-text">{`Количество комнат: ${realtItem.roomsCount}`}</p>
                            <p className="card-text">{`${realtItem.country}, г. ${realtItem.city}, ул.${realtItem.street}, д.${realtItem.house}`}</p>
                            <p className="card-text">
                                {'Автор: '}
                                {realtItem.user
                                    ?
                                    <a href={USER_ROUTE + '/' + realtItem.user.id}>{`${realtItem.user.firstName} ${realtItem.user.lastName}`}</a>
                                    :
                                    <>{'Загрузка...'}</>
                                }
                            </p>
                            
                            {user.isAuth
                            ?
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <button 
                                    onClick={(event) => user.isAuth ? (realt.favorites.some(favorite => favorite.id === realtItem.id) ? deleteFavorite(event, realtItem.id) : addFavorite(event, realtItem.id)) : null}
                                    className="btn" 
                                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                >
                                    <i className={`fa${realt.favorites.some(favorite => favorite.id === realtItem.id) ? 's' : 'r'} fa-heart`} style={{ color: realt.favorites.some(favorite => favorite.id === realtItem.id) ? 'red' : 'gray', fontSize: '24px' }}></i>
                                </button>
                            </div>
                            :
                            <></>
                            }

                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="col-md-12">
                                <h5 className="card-title">Описание:</h5>
                                <p className="card-text">
                                    <span>{realtItem.article}</span>
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