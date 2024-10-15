import React, { useContext } from 'react';
import { Form, Card } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {

    const {realt} = useContext(Context)
    
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
                            name="dealTypeId"
                            id="rent"
                            onChange={() => realt.setSelectedDealType(1)}
                        />
                        <Form.Check 
                            type="radio"
                            label="Покупка"
                            name="dealTypeId"
                            id="buy"
                            onChange={() => realt.setSelectedDealType(2)}
                        />
                        <Form.Check 
                            type="radio"
                            label="Любой"
                            name="dealTypeId"
                            id="any"
                            onChange={() => realt.setSelectedDealType(0)}
                        />
                    </Form.Group>
                    <hr></hr>
                    <Form.Group>
                        <Form.Label>Категория</Form.Label>
                        <Form.Check 
                            type="radio"
                            label="Квартира"
                            name="typeId"
                            id="apartment"
                            onChange={() => realt.setSelectedType(1)}
                        />
                        <Form.Check 
                            type="radio"
                            label="Дом"
                            name="typeId"
                            id="house"
                            onChange={() => realt.setSelectedType(2)}
                        />
                        <Form.Check 
                            type="radio"
                            label="Любая"
                            name="typeId"
                            id="anyDeal"
                            onChange={() => realt.setSelectedType(0)}
                        />
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;