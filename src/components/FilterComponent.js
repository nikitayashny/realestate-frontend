import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {
    const {realt} = useContext(Context)
    const [selectedDealType, setSelectedDealType] = useState(realt.selectedDealType);
    const [selectedType, setSelectedType] = useState(realt.selectedType);
    const [roomsCount, setRoomsCount] = useState(realt.roomsCount)
    const [maxPrice, setMaxPrice] = useState(realt.maxPrice)

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setMaxPrice(-1);
        } else {
            const numericValue = Number(value);
            setMaxPrice(numericValue);
        }
    }

    const handlePriceBlur = (event) => {
        const value = event.target.value;
        if (value === '') {
            realt.setMaxPrice(-1);
        } else {
            const numericValue = Number(value);
            realt.setMaxPrice(numericValue);
        }
    }

    const handlePriceKeyDown = (event) => {
        if (event.key === 'Enter') {
            const value = maxPrice; 
            if (value === '') {
                realt.setMaxPrice(-1);
            } else {
                const numericValue = Number(value);
                realt.setMaxPrice(numericValue);
            }
        }
    };

    useEffect(() => {
        if (realt.maxPrice === -1) {
            setMaxPrice('');
        } else {
            setMaxPrice(realt.maxPrice);
        }
    }, [realt.maxPrice]);

    const baseFilterStyle = {
        padding: '5px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        width: '100%',
    }
    
    return (
        <Card className="mt-3" bg='light'>
            <Card.Body>
                <Card.Title>Фильтры</Card.Title>
                <hr></hr>
                <Row>
                    <Col md={3}>
                        <p>Тип сделки</p>
                        <select
                            value={selectedDealType}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setSelectedDealType(value);
                                realt.setSelectedDealType(value);
                            }}
                            style={baseFilterStyle}
                        >
                            <option value={0}>Любая</option>
                            <option value={1}>Аренда</option>
                            <option value={2}>Покупка</option>
                            <option value={3}>Посуточно</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <p>Тип недвижимости</p>
                        <select
                            value={selectedType}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setSelectedType(value);
                                realt.setSelectedType(value);
                            }}
                            style={baseFilterStyle}
                        >
                            <option value={0}>Любая</option>
                            <option value={1}>Квартира</option>
                            <option value={2}>Дом</option>
                            <option value={3}>Офис</option>
                            <option value={4}>Гараж</option>
                            <option value={5}>Торговое помещение</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <p>Количество комнат</p>
                        <select
                            value={roomsCount}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setRoomsCount(value);
                                realt.setRoomsCount(value);
                            }}
                            style={baseFilterStyle}
                        >
                            <option value={0}>Любое</option>
                            <option value={1}>1 комната</option>
                            <option value={2}>2 комнаты</option>
                            <option value={3}>3 комнаты</option>
                            <option value={4}>4 комнаты</option>
                            <option value={5}>Более 4 комнат</option>
                        </select>
                    </Col>
                    <Col md={3}>
                        <p>Максимальная цена</p>
                        
                        <input
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            type="number"
                            name="maxPrice"
                            id="price"
                            min="0"
                            value={maxPrice === -1 ? '' : maxPrice} 
                            onChange={handlePriceChange}
                            onBlur={handlePriceBlur}
                            onKeyDown={handlePriceKeyDown}
                        />
                        
                    </Col>
                </Row>
                
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;