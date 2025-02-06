import React, { useEffect, useState, useContext } from "react";
import { Container, Card, ToastContainer } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { fetchOneRealt, addToFavorites, deleteFromFavorites, repostRealt } from "../http/realtAPI";
import { observer } from "mobx-react-lite";
import { USER_ROUTE } from "../utils/consts";
import { Context } from "..";
import Notification from "../components/Notification";
import { Carousel, Image } from 'antd';
import Map from "../components/Map"

const RealtPage = observer(() => {
    const [realtItem, setRealt] = useState({});
    const { id } = useParams();
    const {realt} = useContext(Context)
    const {user} = useContext(Context)
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [notificationColor, setNotificationColor] = useState('');
    const [notificationHeader, setNotificationHeader] = useState('');

    useEffect(() => {
        fetchOneRealt(id).then(data => setRealt(data));
    }, [id]);

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
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <ToastContainer position="top-center">
                <Notification
                    show={showNotification}
                    message={notificationMessage}
                    color={notificationColor}
                    header={notificationHeader}
                    onClose={() => setShowNotification(false)}
                />
            </ToastContainer>
            <div className="row">
                <div className="col-md-6">
                <Carousel arrows infinite={true} style={{height:"400px"}}>
                    {realtItem.images && realtItem.images.length > 0 ? (
                        realtItem.images.map((image) => (
                            <Image
                                width={'100%'}
                                height={'400px'}
                                objectFit={'cover'}
                                key={image}
                                src={image}
                                alt={`Изображение`}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </Carousel>
                </div>
                <div className="col-md-6">
                    <Card className="position-relative" bg="light" data-bs-theme="light">
                        <div className="card-body">
                            <h3 className="card-title">
                                <span>{realtItem.name}</span>
                            </h3>
                            <p className="card-text">
                                {realtItem.dealType?.id === 1 ? `${realtItem.price} $/мес.` 
                                : realtItem.dealType?.id === 2 ? `${realtItem.price} $`
                                : realtItem.dealType?.id === 3 ? `${realtItem.price} $/сутки`
                                : null}
                            </p>
                            <p className="card-text">
                                {`${realtItem.type?.typeName} ${realtItem.area} м²`}
                            </p>
                            <p className="card-text">{`Количество комнат: ${realtItem.roomsCount}`}</p>
                            <p className="card-text">{`${realtItem.country}, г. ${realtItem.city}, ул.${realtItem.street}, д.${realtItem.house}`}</p>
                            <p className="card-text">
                                {'Автор: '}
                                {realtItem.user
                                    ?
                                    <a href={USER_ROUTE + '/' + realtItem.user.id}>{`${realtItem.user.username}`}</a>
                                    :
                                    <>{'Загрузка...'}</>
                                }
                            </p>

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

                        </div>
                    </Card>
                </div>
                <div className="mb-4 mt-4">
                    <Card bg="light" data-bs-theme="light">
                        <div className="card-body">
                            <div className="col-md-12">
                                <h5 className="card-title">Описание:</h5>
                                <p className="card-text">
                                    <span>{realtItem.article}</span>
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <h5 className="ms-3 mb-3">Местоположение</h5>           
            <Map address={realtItem.country + ', ' + realtItem.city + ', ул.' + realtItem.street + ', ' + realtItem.house}/>

        </Container>
        </div>
    );
});

export default RealtPage;