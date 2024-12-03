import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {
    const {realt} = useContext(Context)
    const [selectedDealType, setSelectedDealType] = useState(realt.selectedDealType);
    const [selectedType, setSelectedType] = useState(realt.selectedType);
    const [roomsCount, setRoomsCount] = useState(realt.roomsCount)
    const [maxPrice, setMaxPrice] = useState(realt.maxPrice)
    const radioStyle = {display: 'none'}

    const labelStyle = (isChecked) => ({
        display: 'block',
        padding: '5px',
        border: '2px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: isChecked ? 'black' : 'white',
        color: isChecked ? 'white' : 'black',
        transition: 'background-color 0.3s, border-color 0.3s',
    });

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setMaxPrice(-1);
            //realt.setMaxPrice(-1);
        } else {
            const numericValue = Number(value);
            setMaxPrice(numericValue);
            //realt.setMaxPrice(numericValue);
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
    
    return (
        <Card className="mt-3" bg='light'>
            <Card.Body>
                <Card.Title>Фильтры</Card.Title>
                <hr></hr>
                <Row>
                    <Col md={3}>
                        <p>Категория</p>

                        <input type="radio" name="dealTypeId" id="any" value="0" style={radioStyle}
                            onChange={() => {
                                setSelectedDealType(0);
                                realt.setSelectedDealType(0);
                            }}
                        />
                        <label style={labelStyle(selectedDealType === 0)} htmlFor="any" >Любая</label>

                        <input type="radio" name="dealTypeId" id="rent" value="1" style={radioStyle}
                            onChange={() => {
                                setSelectedDealType(1);
                                realt.setSelectedDealType(1);
                            }}
                        />
                        <label style={labelStyle(selectedDealType === 1)} htmlFor="rent" >Аренда</label>

                        <input type="radio" name="dealTypeId" id="buy" value="2" style={radioStyle}
                            onChange={() => {
                                setSelectedDealType(2);
                                realt.setSelectedDealType(2);
                            }}
                        />
                        <label style={labelStyle(selectedDealType === 2)} htmlFor="buy" >Покупка</label>
           
                    </Col>
                
                    <Col md={3}>
                        <p>Тип недвижимости</p>

                        <input type="radio" name="typeId" id="anyType" value="0" style={radioStyle}
                            onChange={() => {
                                setSelectedType(0);
                                realt.setSelectedType(0);
                            }}
                        />
                        <label style={labelStyle(selectedType === 0)} htmlFor="anyType" >Любой</label>

                        <input type="radio" name="typeId" id="apartment" value="1" style={radioStyle}
                            onChange={() => {
                                setSelectedType(1);
                                realt.setSelectedType(1);
                            }}
                        />
                        <label style={labelStyle(selectedType === 1)} htmlFor="apartment" >Квартира</label>

                        <input type="radio" name="typeId" id="house" value="2" style={radioStyle}
                            onChange={() => {
                                setSelectedType(2);
                                realt.setSelectedType(2);
                            }}
                        />
                        <label style={labelStyle(selectedType === 2)} htmlFor="house" >Дом</label>

                    </Col>

                    <Col md={3}>
                        <p>Количество комнат</p>

                        <input type="radio" name="roomsCount" id="0" value="0" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(0);
                                realt.setRoomsCount(0);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 0)} htmlFor="0">Любое</label>

                        <input type="radio" name="roomsCount" id="1" value="1" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(1);
                                realt.setRoomsCount(1);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 1)} htmlFor="1" >1-комнатные</label>

                        <input type="radio" name="roomsCount" id="2" value="2" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(2);
                                realt.setRoomsCount(2);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 2)} htmlFor="2">2-комнатные</label>

                        <input type="radio" name="roomsCount" id="3" value="3" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(3);
                                realt.setRoomsCount(3);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 3)} htmlFor="3" >3-комнатные</label>

                        <input type="radio" name="roomsCount" id="4" value="4" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(4);
                                realt.setRoomsCount(4);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 4)} htmlFor="4">4-комнатные</label>

                        <input type="radio" name="roomsCount" id="5" value="5" style={radioStyle}
                            onChange={() => {
                                setRoomsCount(5);
                                realt.setRoomsCount(5);
                            }}
                        />
                        <label style={labelStyle(roomsCount === 5)} htmlFor="5" >больше 4 комнат</label>

                    </Col>

                    <Col md={3}>
                        <p>Максимальная цена</p>
                        
                        <input
                            type="number"
                            name="maxPrice"
                            id="price"
                            min="0"
                            value={maxPrice === -1 ? '' : maxPrice} 
                            onChange={handlePriceChange}
                            onBlur={handlePriceBlur}
                            onKeyDown={handlePriceKeyDown}
                            style={{ width: '100%' }}
                        />
                        
                    </Col>

                </Row>
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;