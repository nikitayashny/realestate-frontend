import React from 'react';
import { Form, Card } from 'react-bootstrap';

const FilterComponent = ({ onFilterChange }) => {
    
    return (
        <Card className="mt-3" bg="light" data-bs-theme="light">
            <Card.Body>
                <Card.Title>Фильтры</Card.Title>
                <Form>
                <hr></hr>
                    <Form.Group>
                    <Form.Label>Тип недвижимости</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="Аренда"
                            name="typeId"
                            id="rent"
                            onChange={() => onFilterChange({type: 'typeId', value: 1})}
                        />
                        <Form.Check 
                            type="radio"
                            label="Покупка"
                            name="typeId"
                            id="buy"
                            onChange={() => onFilterChange({type: 'typeId', value: 2})}
                        />
                        <Form.Check 
                            type="radio"
                            label="Любой"
                            name="typeId"
                            id="any"
                            onChange={() => onFilterChange({type: 'typeId', value: null})}
                        />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label>Категория</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="Квартира"
                            name="dealTypeId"
                            id="apartment"
                            onChange={() => onFilterChange({type: 'dealTypeId', value: 1})}
                        />
                        <Form.Check 
                            type="radio"
                            label="Дом"
                            name="dealTypeId"
                            id="house"
                            onChange={() => onFilterChange({type: 'dealTypeId', value: 2})}
                        />
                        <Form.Check 
                            type="radio"
                            label="Любая"
                            name="dealTypeId"
                            id="anyDeal"
                            onChange={() => onFilterChange({type: 'dealTypeId', value: null})}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;