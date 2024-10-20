import { Container, Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from "react";
import { createNews, deleteNews, fetchNews } from "../http/newsAPI";
import { Context } from "..";
import { LIGHT_YELLOW } from "../utils/consts";

const NewsPage = observer(() => {

    const [news, setNews] = useState([]);
    const {user} = useContext(Context)

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
                <div className="alert mt-2" style={{background: LIGHT_YELLOW}}>
                    <h3>{post.title}</h3>
                    <p>{post.title}</p>
                    <a className="btn btn-dark">Детальнее</a>
                    <button onClick={(event) => removeNews(event, post.id)} className="btn btn-danger text-end ms-3">Удалить пост</button>
                </div>
            ))}

        </Container>
    );
});

export default NewsPage;