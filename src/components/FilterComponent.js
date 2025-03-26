import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {
    const {realt} = useContext(Context)
    const [selectedDealType, setSelectedDealType] = useState(realt.selectedDealType);
    const [selectedType, setSelectedType] = useState(realt.selectedType);
    const [roomsCount, setRoomsCount] = useState(realt.roomsCount)
    const [maxPrice, setMaxPrice] = useState(realt.maxPrice)
    const [repair, setRepair] = useState(realt.repair)
    const [floor, setFloor] = useState(realt.floor)
    const [minArea, setMinArea] = useState(realt.minArea)
    const [city, setCity] = useState(realt.city)
    const [street, setStreet] = useState(realt.street)

    const handlePriceChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setMaxPrice(-1);
        } else {
            const numericValue = Number(value);
            setMaxPrice(numericValue);
        }
    }

    const handleFloorChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setFloor(0);
        } else {
            const numericValue = Number(value);
            setFloor(numericValue);
        }
    }

    const handleMinAreaChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setMinArea(0);
        } else {
            const numericValue = Number(value);
            setMinArea(numericValue);
        }
    }

    const handleCityChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setCity('');
        } else {
            setCity(value);
        }
    }

    const handleStreetChange = (event) => {
        const value = event.target.value;
        if (value === '') {
            setStreet('');
        } else {
            setStreet(value);
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
    const handleFloorBlur = (event) => {
        const value = event.target.value;
        if (value === '') {
            realt.setFloor(0);
        } else {
            const numericValue = Number(value);
            realt.setFloor(numericValue);
        }
    }
    const handleMinAreaBlur = (event) => {
        const value = event.target.value;
        if (value === '') {
            realt.setMinArea(0);
        } else {
            const numericValue = Number(value);
            realt.setMinArea(numericValue);
        }
    }
    const handleCityBlur = (event) => {
        const value = event.target.value;
        if (value === '') {
            realt.setCity('');
        } else {
            realt.setCity(value);
        }
    }

    const handleStreetBlur = (event) => {
        const value = event.target.value;
        if (value === '') {
            realt.setStreet('');
        } else {
            realt.setStreet(value);
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

    const handleFloorKeyDown = (event) => {
        if (event.key === 'Enter') {
            const value = floor; 
            if (value === '') {
                realt.setFloor(0);
            } else {
                const numericValue = Number(value);
                realt.setFloor(numericValue);
            }
        }
    };
    const handleMinAreaKeyDown = (event) => {
        if (event.key === 'Enter') {
            const value = minArea; 
            if (value === '') {
                realt.setMinArea(0);
            } else {
                const numericValue = Number(value);
                realt.setMinArea(numericValue);
            }
        }
    };
    const handleCityKeyDown = (event) => {
        if (event.key === 'Enter') {
            const value = city; 
            if (value === '') {
                realt.setCity('');
            } else {
                realt.setCity(value);
            }
        }
    };
    const handleStreetKeyDown = (event) => {
        if (event.key === 'Enter') {
            const value = street; 
            if (value === '') {
                realt.setStreet('');
            } else {
                realt.setStreet(value);
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

    useEffect(() => {
        if (realt.floor === 0) {
            setFloor('');
        } else {
            setFloor(realt.floor);
        }
    }, [realt.floor]);

    useEffect(() => {
        if (realt.minArea === 0) {
            setMinArea('');
        } else {
            setMinArea(realt.minArea);
        }
    }, [realt.minArea]);
    
    useEffect(() => {
        if (realt.city === '') {
            setCity('');
        } else {
            setCity(realt.city);
        }
    }, [realt.city]);

    useEffect(() => {
        if (realt.street === '') {
            setStreet('');
        } else {
            setStreet(realt.street);
        }
    }, [realt.street]);

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
                    <Col md={4}>
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
                    <Col md={4}>
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
                    <Col md={4}>
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
                    
                </Row>
                <div className='mt-2'></div>
                <Row>
                <Col md={4}>
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
                    <Col md={4}>
                        <p>Наличие ремонта</p>
                        <select
                            value={repair}
                            onChange={(e) => {
                                const value = parseInt(e.target.value);
                                setRepair(value);
                                realt.setRepair(value);
                            }}
                            style={baseFilterStyle}
                        >
                            <option value={0}>Любой</option>
                            <option value={1}>Без ремонта</option>
                            <option value={2}>Старый ремонт</option>
                            <option value={3}>Новый ремонт</option>
                        </select>
                    </Col>          
                    <Col md={4}>
                        <p>Минимальная площадь</p>
                        
                        <input
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            type="number"
                            name="minArea"
                            id="minArea"
                            min="0"
                            value={minArea === 0 ? '' : minArea} 
                            onChange={handleMinAreaChange}
                            onBlur={handleMinAreaBlur}
                            onKeyDown={handleMinAreaKeyDown}
                        />
                    </Col>
                </Row>
                <div className='mt-2'></div>
                <Row>
                <Col md={4}>
                        <p>Город</p>
                        
                        <input
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            type='text'
                            name="city"
                            id="city"
                            value={city} 
                            onChange={handleCityChange}
                            onBlur={handleCityBlur}
                            onKeyDown={handleCityKeyDown}
                        />
                    </Col>
                    <Col md={4}>
                        <p>Улица</p>
                        
                        <input
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            type='text'
                            name="street"
                            id="street"
                            value={street} 
                            onChange={handleStreetChange}
                            onBlur={handleStreetBlur}
                            onKeyDown={handleStreetKeyDown}
                        />
                    </Col>  
                    <Col md={4}>
                        <p>Желаемый этаж</p>
                        
                        <input
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                            type="number"
                            name="floor"
                            id="floor"
                            min="0"
                            value={floor === 0 ? '' : floor} 
                            onChange={handleFloorChange}
                            onBlur={handleFloorBlur}
                            onKeyDown={handleFloorKeyDown}
                        />
                    </Col>
                    
                </Row>
                
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;