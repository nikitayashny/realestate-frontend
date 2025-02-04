import React, { useContext, useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {
    const {realt} = useContext(Context)
    const [selectedDealType, setSelectedDealType] = useState(realt.selectedDealType);
    const [selectedType, setSelectedType] = useState(realt.selectedType);
    const [roomsCount, setRoomsCount] = useState(realt.roomsCount)
    const [maxPrice, setMaxPrice] = useState(realt.maxPrice)

    // const radioStyle = {display: 'none'}

    // const labelStyle = (isChecked) => ({
    //     display: 'block',
    //     padding: '5px',
    //     border: '2px solid #ccc',
    //     borderRadius: '4px',
    //     cursor: 'pointer',
    //     backgroundColor: isChecked ? 'black' : 'white',
    //     color: isChecked ? 'white' : 'black',
    //     transition: 'background-color 0.3s, border-color 0.3s',
    // });

    // const handlePriceChange = (event) => {
    //     const value = event.target.value;
    //     if (value === '') {
    //         setMaxPrice(-1);
    //     } else {
    //         const numericValue = Number(value);
    //         setMaxPrice(numericValue);
    //     }
    // }

    // const handlePriceBlur = (event) => {
    //     const value = event.target.value;
    //     if (value === '') {
    //         realt.setMaxPrice(-1);
    //     } else {
    //         const numericValue = Number(value);
    //         realt.setMaxPrice(numericValue);
    //     }
    // }

    // const handlePriceKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         const value = maxPrice; 
    //         if (value === '') {
    //             realt.setMaxPrice(-1);
    //         } else {
    //             const numericValue = Number(value);
    //             realt.setMaxPrice(numericValue);
    //         }
    //     }
    // };

    // useEffect(() => {
    //     if (realt.maxPrice === -1) {
    //         setMaxPrice('');
    //     } else {
    //         setMaxPrice(realt.maxPrice);
    //     }
    // }, [realt.maxPrice]);
    
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
                            style={{
                                padding: '5px',
                                border: '2px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            <option value={0}>Любая</option>
                            <option value={1}>Аренда</option>
                            <option value={2}>Покупка</option>
                            <option value={3}>Посуточно</option>
                        </select>
                    </Col>
                </Row>
                
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;