import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from "react";
import { fetchNews, deleteNews, createNews } from "../http/newsAPI";
import { Context } from "..";
import { createComment, deleteComment } from "../http/commentAPI";
import AddNewsModal from "../components/modals/AddNewsModal";
import { USER_ROUTE } from "../utils/consts";

const NewsPage = observer(() => {
    const [showModal, setShowModal] = useState(false); 
    const [news, setNews] = useState([]);
    const [visibleArticles, setVisibleArticles] = useState({});
    const {user} = useContext(Context)
    const [newComment, setNewComment] = useState({});

    const handleCommentChange = (postId, text) => {
        setNewComment(prev => ({ ...prev, [postId]: text }));
    };

    const addComment = (postId) => {
        const params = {
            postId: postId,
            text: newComment[postId]
        };
        createComment(params)
            .then(() => {
                fetchNews().then(data => {  
                    setNews(data);
                    setNewComment("")
                });
            })
            .catch(error => {
                console.error('Ошибка при добавлении комментария:', error);
            });
    };

    const removeComment = (event, commentId) =>{
        event.preventDefault()
        event.stopPropagation()

        deleteComment(commentId)
        .then(() => {
            fetchNews().then(data => {  
                setNews(data);
            });
        })
        .catch(error => {
            console.error('Ошибка при удалении комментария:', error);
        });
    }

    const toggleArticleVisibility = (id) => {
        setVisibleArticles(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        fetchNews().then(data => {  
            setNews(data.sort((a, b) => b.id - a.id))
        })
    }, []);

    const removeNews = (event, id) => {
        event.preventDefault()
        event.stopPropagation()
        deleteNews(id)
            .then(() => {
                fetchNews().then(data => {  
                    setNews(data)
                })
            })
    };

    const handleModalSubmit = async (formData) => {
        try {
            const response = await createNews(formData);
            console.log('News added:', response);
            fetchNews().then(data => {  
                setNews(data);
            });
            setShowModal(false); 
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };

    return (
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Новости</h4>
                {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                    <Button variant="dark" onClick={() => setShowModal(true)}>Добавить новость</Button>
                )}
            </div>

            <AddNewsModal show={showModal} onHide={() => setShowModal(false)}  onSubmit={handleModalSubmit} />

            {news.map(post => (
                <div className="alert mt-2" style={{ background: "#f0f0f0" }} key={post.id}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>{post.title}</h3>
                        <div>
                            {(() => {
                                const dateOfCreated = post.dateOfCreated;
                                const date = new Date(Date.UTC(
                                    dateOfCreated[0],    
                                    dateOfCreated[1] - 1, 
                                    dateOfCreated[2],       
                                    dateOfCreated[3],     
                                    dateOfCreated[4],    
                                    dateOfCreated[5]      
                                ));
                                const options = {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'UTC',
                                };
                                return date.toLocaleString('ru-RU', options);
                            })()}
                        </div>
                    </div>
                    <p>{post.anons}</p>
                    {visibleArticles[post.id] && (
                        <div className="mt-2">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img style={{width: "80%", objectFit: "cover" }} src={post.image} alt="Изображение загружается..." />
                            </div>
                            <div>{post.full_text}</div>
                            <div className="mt-3 alert bg-light">
                                <h4>Комментарии:</h4>
                                <hr></hr>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map(comment => (
                                        <div key={comment.id} >                                            
                                            <div className="d-flex justify-content-between align-items-start">
                                                <strong><a href={USER_ROUTE + '/' + comment.user.id}>{comment.user.username}</a></strong>   
                                                <p>
                                                {(() => {
                                                    const dateOfCreated = comment.dateOfCreated;
                                                    const date = new Date(Date.UTC(
                                                        dateOfCreated[0],    
                                                        dateOfCreated[1] - 1, 
                                                        dateOfCreated[2],       
                                                        dateOfCreated[3],     
                                                        dateOfCreated[4],    
                                                        dateOfCreated[5]      
                                                    ));
                                                    const options = {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: false,
                                                        timeZone: 'UTC',
                                                    };
                                                    return date.toLocaleString('ru-RU', options);
                                                })()} 
                                            </p>
                                            </div>          
                                            <div className="d-flex justify-content-between align-items-start">
                                            <article style={{ flex: '1', marginRight: '10px', wordBreak: 'break-word' }}>{comment.text}</article>
                                                {((user.isAuth && user.userId === comment.user.id)) || user.role === "ADMIN" || user.role === "SUPER_ADMIN" ? (
                                                    <Button onClick={(event) => removeComment(event, comment.id)} variant="outline-danger" className="btn-sm">Удалить</Button>
                                                ) : null}
                                            </div>
                                            <hr></hr>
                                        </div>                                                                      
                                    ))
                                ) : (
                                    <p>Нет комментариев.</p>
                                )}
                                
                                {user.isAuth && (
                                    <div className="mt-3">
                                        <h5>Написать комментарий:</h5>
                                        <textarea
                                            rows="3"
                                            placeholder="Ваш комментарий..."
                                            value={newComment[post.id] || ''}
                                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                                            className="form-control"
                                        />
                                        <Button 
                                            variant="primary"
                                            className="mt-2"
                                            onClick={() => addComment(post.id)}
                                            disabled={!newComment[post.id]}
                                        >
                                            Отправить
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <Button variant="outline-dark" className="mt-3" onClick={() => toggleArticleVisibility(post.id)}>
                        {visibleArticles[post.id] ? 'Скрыть' : 'Детальнее'}
                    </Button>
                    {(user.role === "ADMIN" || user.role === "SUPER_ADMIN") && (
                        <Button variant="outline-danger" onClick={(event) => removeNews(event, post.id)} className="text-end ms-3 mt-3">
                            Удалить пост
                        </Button>
                    )}
                </div>
            ))}
          
        </Container>
        </div>
    );
});

export default NewsPage;