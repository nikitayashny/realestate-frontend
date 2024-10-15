import React, { useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
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
            const response = await createRealt(formData)
            console.log('Объявление добавлено:', response);
    
            fetchRealts(realt.limit, realt.page, realt.selectedType, realt.selectedDealType, 0).then(data => {  
                realt.setRealts(data.realts)
                realt.setTotalCount(data.totalCount)
            })

            fetchUsersRealts(user.userId).then(data => {  
                realt.setUsersRealts(data);
            });
            onHide();
        } catch (error) {
            console.error('Ошибка при добавлении объявления:', error);
        }
    };

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
            <Modal.Header closeButton>
                <Modal.Title>Добавить новое объявление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="type" className="form-label">Тип недвижимости:</label>
                            <select className="form-select" id="type" name="type" required>
                                <option value="" disabled>Выберите тип недвижимости</option>
                                <option value="1">Квартира</option>
                                <option value="2">Дом</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="dealType" className="form-label">Тип сделки:</label>
                            <select className="form-select" id="dealType" name="dealType" required>
                                <option value="" disabled>Выберите тип сделки</option>
                                <option value="1">Аренда</option>
                                <option value="2">Продажа</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название:</label>
                        <input type="text" className="form-control" id="name" name="name" required />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="price" className="form-label">Цена:</label>
                            <input type="number" className="form-control" id="price" name="price" required />
                        </div>
                        <div className="col">
                            <label htmlFor="roomsCount" className="form-label">Комнаты:</label>
                            <input type="number" className="form-control" id="roomsCount" name="roomsCount" required />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="country" className="form-label">Страна:</label>
                            <input type="text" className="form-control" id="country" name="country" required />
                        </div>
                        <div className="col">
                            <label htmlFor="city" className="form-label">Город:</label>
                            <input type="text" className="form-control" id="city" name="city" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="street" className="form-label">Улица:</label>
                        <input type="text" className="form-control" id="street" name="street" required />
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="house" className="form-label">Дом:</label>
                            <input type="number" className="form-control" id="house" name="house" required />
                        </div>
                        <div className="col">
                            <label htmlFor="area" className="form-label">Площадь:</label>
                            <input type="number" className="form-control" id="area" name="area" required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file1" className="form-label">Фотография 1:</label>
                        <input type="file" className="form-control" id="file1" name="file1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file2" className="form-label">Фотография 2:</label>
                        <input type="file" className="form-control" id="file2" name="file2" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file3" className="form-label">Фотография 3:</label>
                        <input type="file" className="form-control" id="file3" name="file3" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="article" className="form-label">Описание:</label>
                        <textarea className="form-control" id="article" name="article" rows="2"></textarea>
                    </div>
                    <input type="hidden" name="userId" value={user.userId} />
                    <Button type="submit" variant="primary">Добавить объявление</Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddRealtModal;