import React, {useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddNewsModal = ({ show, onHide, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [anons, setAnons] = useState('');
    const [fullText, setFullText] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('anons', anons);
        formData.append('full_text', fullText);
        onSubmit(formData);
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton className='bg-dark text-white'>
                <Modal.Title>Добавить новость</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Заголовок</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите заголовок" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formAnons">
                        <Form.Label>Анонс</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            placeholder="Введите анонс" 
                            value={anons}
                            onChange={(e) => setAnons(e.target.value)}
                            required 
                        />
                    </Form.Group>
                    <Form.Group controlId="formFullText">
                        <Form.Label>Текст</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={5} 
                            placeholder="Введите текст" 
                            value={fullText}
                            onChange={(e) => setFullText(e.target.value)}
                            required 
                        />
                    </Form.Group>
                    <Button className='mt-2' variant="dark" type="submit">
                        Добавить
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddNewsModal;