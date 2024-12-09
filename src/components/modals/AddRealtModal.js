import React, { useContext } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { Context } from '../../index';
import { createRealt, fetchRealts, fetchUsersRealts} from '../../http/realtAPI';

const AddRealtModal = ({ show, onHide }) => {
    const { user } = useContext(Context);
    const { realt } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        const formElements = event.target.elements;
    
        const realtItem = {
            type: formElements.type.value,
            dealType: formElements.dealType.value,
            name: formElements.name.value,
            price: formElements.price.value,
            roomsCount: formElements.roomsCount.value,
            country: formElements.country.value,
            city: formElements.city.value,
            street: formElements.street.value,
            house: formElements.house.value,
            area: formElements.area.value,
            article: formElements.article.value,
        };
    
        Object.keys(realtItem).forEach(key => {
            formData.append(key, realtItem[key]);
        });
    
        formData.append("file1", formElements.file1.files[0]);
        formData.append("file2", formElements.file2.files[0]);
        formData.append("file3", formElements.file3.files[0]);
    
        formData.append("userId", user.userId);
    
        try {
            onHide();
            const response = await createRealt(formData)
            console.log('Объявление добавлено:', response);
    
            fetchRealts(realt.limit, realt.page, realt.selectedType, realt.selectedDealType, realt.roomsCount, realt.maxPrice, realt.sortType, 0).then(data => {  
                realt.setRealts(data.realts)
                realt.setTotalCount(data.totalCount)
            })

            fetchUsersRealts(user.userId).then(data => {  
                realt.setUsersRealts(data);
            });
            
        } catch (error) {
            console.error('Ошибка при добавлении объявления:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} fullscreen={true}>
            <Modal.Header closeButton className='bg-dark text-white'>
                <Modal.Title>Добавление нового объявления</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Container>
                        <div className="row mb-1">
                            <div className="col">
                                <label htmlFor="type" className="form-label">Тип недвижимости:</label>
                                <select className="form-select form-select-sm" id="type" name="type" required>
                                    <option value="" disabled>Выберите тип недвижимости</option>
                                    <option value="1">Квартира</option>
                                    <option value="2">Дом</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="dealType" className="form-label">Тип сделки:</label>
                                <select className="form-select form-select-sm" id="dealType" name="dealType" required>
                                    <option value="" disabled>Выберите тип сделки</option>
                                    <option value="1">Аренда</option>
                                    <option value="2">Продажа</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name" className="form-label">Название:</label>
                                <input type="text" className="form-control form-control-sm" id="name" name="name" required />
                            </div>
                            <div className="col">
                                <label htmlFor="price" className="form-label">Цена:</label>
                                <input type="number" className="form-control form-control-sm" id="price" name="price" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="roomsCount" className="form-label">Комнаты:</label>
                                <input type="number" className="form-control form-control-sm" id="roomsCount" name="roomsCount" required />
                            </div>
                            <div className="col">
                                <label htmlFor="country" className="form-label">Страна:</label>
                                <input type="text" className="form-control form-control-sm" id="country" name="country" required />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="city" className="form-label">Город:</label>
                                <input type="text" className="form-control form-control-sm" id="city" name="city" required />
                            </div>
                            <div className="col">
                                <label htmlFor="street" className="form-label">Улица:</label>
                                <input type="text" className="form-control form-control-sm" id="street" name="street" required />
                            </div>
                        </div>               
                        <div className="row">
                            <div className="col">
                                <label htmlFor="house" className="form-label">Дом:</label>
                                <input type="number" className="form-control form-control-sm" id="house" name="house" required />
                            </div>
                            <div className="col">
                                <label htmlFor="area" className="form-label">Площадь:</label>
                                <input type="number" className="form-control form-control-sm" id="area" name="area" required />
                            </div>
                        </div>  
                        <div className="row">
                            <div className="col">
                                <label htmlFor="file1" className="form-label">Фотография 1:</label>
                                <input type="file" className="form-control form-control-sm" id="file1" name="file1" required />
                            </div>
                            <div className="col">
                                <label htmlFor="file2" className="form-label">Фотография 2:</label>
                                <input type="file" className="form-control form-control-sm" id="file2" name="file2" required />
                            </div>
                            <div className="col">
                                <label htmlFor="file3" className="form-label">Фотография 3:</label>
                                <input type="file" className="form-control form-control-sm" id="file3" name="file3" required />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="article" className="form-label">Описание:</label>
                            <textarea className="form-control form-control-sm" id="article" name="article" rows="2"></textarea>
                        </div>
                        <input type="hidden" name="userId" value={user.userId} />
                        <Button type="submit" variant="dark">Добавить объявление</Button>
                    </Container>
                </form>        
            </Modal.Body>
            <Modal.Footer className='bg-dark'>
                <Button variant="secondary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRealtModal;