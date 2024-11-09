import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from "react";
import { createNews, deleteNews, fetchNews } from "../http/newsAPI";
import { Context } from "..";
import { createComment, deleteComment } from "../http/commentAPI";
import AddNewsModal from '../components/modals/AddNewsModal'; 


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
            userId: user.userId,
            text: newComment[postId]
        };
        createComment(params)
            .then(() => {
                fetchNews().then(data => {  
                    setNews(data);
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
        <Container className="mt-5 mb-5" style={{ minHeight: '71vh', background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4>Новости</h4>
                {user.isAdmin && (
                    <Button variant="primary" onClick={() => setShowModal(true)}>Добавить новость</Button>
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
                            <div>{post.full_text}</div>
                            <div className="mt-3 alert bg-light">
                                <h4>Комментарии:</h4>
                                <hr></hr>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map(comment => (
                                        <div key={comment.id} >                                            
                                            <div className="d-flex justify-content-between align-items-start">
                                                <strong>{comment.user.firstName + ' ' + comment.user.lastName}</strong>   
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
                                                {((user.isAuth && user.userId === comment.user.id)) || user.isAdmin ? (
                                                    <button onClick={(event) => removeComment(event, comment.id)} className="btn btn-danger btn-sm">Удалить</button>
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
                                            className="btn btn-primary mt-2"
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
                    <Button className="btn btn-dark mt-3" onClick={() => toggleArticleVisibility(post.id)}>
                        {visibleArticles[post.id] ? 'Скрыть' : 'Детальнее'}
                    </Button>
                    {user.isAdmin && (
                        <Button 
                            onClick={(event) => removeNews(event, post.id)}
                            className="btn btn-danger text-end ms-3 mt-3">
                            Удалить пост
                        </Button>
                    )}
                </div>
            ))}
          
        </Container>
    );
});

export default NewsPage;