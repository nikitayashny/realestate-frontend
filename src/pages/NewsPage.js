import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from "react";
import { createNews, deleteNews, fetchNews } from "../http/newsAPI";
import { Context } from "..";
import { LIGHT_YELLOW } from "../utils/consts";
import { createComment, deleteComment } from "../http/commentAPI";

const NewsPage = observer(() => {

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
            setNews(data)
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        const formElements = event.target.elements;
    
        const realtItem = {
            title: formElements.title.value,
            anons: formElements.anons.value,
            full_text: formElements.full_text.value,
        };
    
        Object.keys(realtItem).forEach(key => {
            formData.append(key, realtItem[key]);
        });
    
        try {
            const response = await createNews(formData)
            console.log('Новость добавлена:', response);
    
            fetchNews().then(data => {  
                setNews(data)
            })
        } catch (error) {
            console.error('Ошибка при добавлении новости:', error);
        }
    };


    return (
        <Container className="mt-5" style={{ minHeight: '77vh'}}>
            <h4 className="mb-4">Новости</h4>
            {user.isAdmin
            ?
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Заголовок:</label>
                    <input type="text" className="form-control" id="title" name="title" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="anons" className="form-label">Анонс:</label>
                    <textarea className="form-control" id="anons" name="anons" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="full_text" className="form-label">Текст:</label>
                    <textarea className="form-control" id="full_text" name="full_text" required></textarea>
                </div>
                <Button type="submit" variant="primary">Добавить пост</Button>
            </form>
            :
            <></>
            }

            {news.map(post => (
                <div className="alert mt-2" style={{ background: "#f0f0f0" }} key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.anons}</p>
                    {visibleArticles[post.id] && (
                        <div className="mt-2">
                            <div>{post.full_text}</div>
                            <div className="mt-3">
                                <h4>Комментарии:</h4>
                                {post.comments && post.comments.length > 0 ? (
                                    post.comments.map(comment => (
                                        <div key={comment.id} className="comment">
                                            <p><strong>{comment.user.firstName + ' ' + comment.user.lastName}:</strong> {comment.text}</p>
                                            
                                            {((user.isAuth && user.userId === comment.user.id)) || user.isAdmin ? (
                                                <div className="text-end m-3">
                                                    <button onClick={(event) => removeComment(event, comment.id)} className="btn btn-danger">Удалить</button>
                                                </div>
                                            ) : null}
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