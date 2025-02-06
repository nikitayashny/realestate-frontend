import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Context } from '../../index';
import { fetchUserFilter, changeUserFilter } from "../../http/userAPI";

const UserFilterModal = ({ show, onHide }) => {
    const { user } = useContext(Context);
    const [filters, setFilters] = useState({})

    useEffect(() => {
        if (user.userId) {
            fetchUserFilter(user.userId).then(data => {
                setFilters(data)
            }) 
        }
    }, [user.userId])

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const formData = new FormData()
        const formElements = event.target.elements

        const filter = {
            typeId: formElements.type.value,
            dealTypeId: formElements.dealType.value,
            maxPrice: formElements.price.value === '' ? 0 : formElements.price.value,
            roomsCount: formElements.roomsCount.value === '' ? 0 : formElements.roomsCount.value,
            city: formElements.city.value,
            active: formElements.active.checked
        }

        Object.keys(filter).forEach(key => {
            formData.append(key, filter[key])
        });

        try {
            changeUserFilter(formData)
            .then(() => {
                fetchUserFilter(user.userId)
                .then((data) => {
                    setFilters(data)
                })
            })
            onHide();
        } catch (error) {
            console.error('Ошибка при изменении фильтра:', error);
        }
    }

    return (
        <Modal show={show} onHide={onHide} dialogClassName="modal-lg">
            <Modal.Header closeButton className='bg-dark text-white'>
                <Modal.Title>Мои пожелания</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="type" className="form-label">Тип недвижимости:</label>
                            <select className="form-select" id="type" name="type" defaultValue={filters.type?.id || ""}>
                                <option value="0"></option>
                                <option value="1">Квартира</option>
                                <option value="2">Дом</option>
                                <option value="3">Офис</option>
                                <option value="4">Гараж</option>
                                <option value="5">Торговое помещение</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="dealType" className="form-label">Тип сделки:</label>
                            <select className="form-select" id="dealType" name="dealType" defaultValue={filters.dealType?.id || ""}>
                                <option value="0" ></option>
                                <option value="1">Аренда</option>
                                <option value="2">Продажа</option>
                                <option value="3">Посуточно</option>
                            </select>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="price" className="form-label">Максимальная цена:</label>
                            <input type="number" className="form-control" id="price" name="price" min="0" defaultValue={filters.maxPrice}/>
                        </div>
                        <div className="col">
                            <label htmlFor="roomsCount" className="form-label">Количество комнат:</label>
                            <input type="number" className="form-control" id="roomsCount" name="roomsCount" defaultValue={filters.roomsCount}/>
                        </div>
                    </div>
                    <div className="col">
                        <label htmlFor="city" className="form-label">Город:</label>
                        <input type="text" className="form-control" id="city" name="city" defaultValue={filters.city}/>
                    </div>
                    <div className="form-check mb-3">
                        <input 
                            type="checkbox" 
                            className="form-check-input" 
                            id="active" 
                            name="active" 
                            checked={filters.active} 
                            onChange={(e) => {
                                const newValue = e.target.checked;
                                setFilters(prevFilters => ({
                                    ...prevFilters,
                                    active: newValue
                                }));
                            }} 
                        />
                        <label className="form-check-label" htmlFor="active">Оповещать меня о появлении товара</label>
                    </div>
                    <input type="hidden" name="userId" value={user.userId} />
                    <Button type="submit" variant="dark">Подтвердить</Button>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default UserFilterModal;