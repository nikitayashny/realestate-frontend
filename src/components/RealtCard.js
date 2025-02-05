import { Card, Col, ToastContainer } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { REALT_ROUTE } from "../utils/consts";
import { addToFavorites, deleteFromFavorites, deleteRealt, fetchRealts, fetchFavorites, viewRealt, repostRealt } from "../http/realtAPI";
import React, { useContext, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import Notification from "../components/Notification";
import { fetchUsersRealts } from "../http/userAPI";

const RealtCard = observer(({realtItem}) => { 

    const navigate = useNavigate()
    const {realt} = useContext(Context)
    const {user} = useContext(Context)
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('');
    const [notificationHeader, setNotificationHeader] = useState('');

    const PAGE_SIZE = 5

    const removeRealt = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        deleteRealt(id)
            .then(() => {
                fetchRealts(realt.page - 1, PAGE_SIZE, realt.selectedDealType, realt.selectedType, realt.roomsCount, realt.maxPrice, realt.sortType)
                .then(data => {  
                    realt.setRealts(data.realts)
                    realt.setTotalCount(data.count)
                })
            })
            // .then(() => {
            //     fetchFavorites(user.userId).then(data => {  
            //         realt.setFavorites(data)
            //     })
            // })
            .then(() => {
                fetchUsersRealts(user.userId).then(data => {  
                    realt.setUsersRealts(data);
                });
            })
    };

    const addFavorite = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        // const params = {
        //     userId: user.userId,
        //     realtId: id
        // };
        // addToFavorites(params)
        // .then(data => {  
        //     realt.setFavorites(data);
        // });
    };

    const deleteFavorite = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        // const params = {
        //     userId: user.userId,
        //     realtId: id
        // };
        // deleteFromFavorites(params)
        // .then(data => {  
        //     realt.setFavorites(data);
        // });
    };

    const viewAndNavigate = async () => {
        viewRealt(realtItem.id);
        navigate(REALT_ROUTE + '/' + realtItem.id)
    }

    const repost = async (event) => {
        event.preventDefault()
        event.stopPropagation()

        const currentUrl = window.location.href;
        const baseUrl = new URL(currentUrl).origin;
        const link = `${baseUrl}/realt/${realtItem.id}`;

        try {
            navigator.clipboard.writeText(link);
            setNotificationMessage('Ссылка скопирована в буфер обмена')
            setNotificationColor('success')
            setNotificationHeader('Успешно')
            setShowNotification(true)
        } catch (err) {
            setNotificationMessage('Не удалось скопировать ссылку')
            setNotificationColor('danger')
            setNotificationHeader('Ошибка')
            setShowNotification(true)
        }

        await repostRealt(realtItem.id)
    }
    
    return (
        <Col md={12}  className="mt-3" onClick={() => viewAndNavigate()}>
            <ToastContainer position="center">
                <Notification
                    show={showNotification}
                    message={notificationMessage}
                    color={notificationColor}
                    header={notificationHeader}
                    onClose={() => setShowNotification(false)}
                />
            </ToastContainer>
            <Card style={{ position: 'relative', cursor: 'pointer'}} bg="light">
                <div className="row g-0">
                    <div className="col-md-5">
                        <img style={{ height: "280px", width: "100%", objectFit: "cover" }} src={realtItem.images[0]} alt="Изображение загружается..." />
                    </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{realtItem.name}</h5>
                        <p className="card-text">{realtItem.dealType.id === 1 ? `${realtItem.price} $/мес.` 
                                                : realtItem.dealType.id === 2 ? `${realtItem.price} $` 
                                                : realtItem.dealType.id === 3 ? `${realtItem.price} $/сутки.`
                                                : null}
                        </p>
                        <p className="card-text">{`${realtItem.type.typeName} ${realtItem.area} м²`}</p>
                        <p className="card-text">{`Количество комнат: ${realtItem.roomsCount}`}</p>
                        <p className="card-text">{`${realtItem.country}, г. ${realtItem.city}, ул.${realtItem.street}, д.${realtItem.house}`}</p>
                    </div>
                    {((user.isAuth && user.userId === realtItem.user.id)) || (user.role === "ADMIN" || user.role === "SUPER_ADMIN") ? (
                    <div className="text-end m-3">
                        <button onClick={(event) => removeRealt(event, realtItem.id)} className="btn btn-dark">Удалить объявление</button>
                    </div>
                ) : null}
                </div>
            </div>

            <div style={{ position: 'absolute', top: '14px', right: '100px' }}>
                {realtItem.views} просмотров
            </div>

            <div style={{ position: 'absolute', top: '10px', right: '50px' }}>
                <button 
                    onClick={(event) => repost(event)}
                    className="btn" 
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                    >
                        <i className={`fa fa-share-alt`} style={{fontSize: '24px'}}></i>
                </button>
            </div>

            {/* {user.isAuth
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
            } */}

        </Card>
    </Col>
    )
})

export default RealtCard