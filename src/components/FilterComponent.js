import React from 'react';
import { Form } from 'react-bootstrap';

const FilterComponent = ({ onFilterChange }) => {
    return (
        <Form>
            <Form.Group>
                <Form.Label>Тип недвижимости</Form.Label>
                <Form.Check 
                    type="radio"
                    label="Аренда"
                    name="typeId"
                    id="buy"
                    onChange={() => onFilterChange({type: 'typeId', value: 1})}
                />
                <Form.Check 
                    type="radio"
                    label="Покупка"
                    name="typeId"
                    id="rent"
                    onChange={() => onFilterChange({type: 'typeId', value: 2})}
                />
                <Form.Check 
                    type="radio"
                    label="Любой"
                    name="typeId"
                    id="rent"
                    onChange={() => onFilterChange({type: 'typeId', value: null})}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Категория</Form.Label>
                <Form.Check 
                    type="radio"
                    label="Квартира"
                    name="dealTypeId"
                    id="house"
                    onChange={() => onFilterChange({type: 'dealTypeId', value: 1})}
                />
                <Form.Check 
                    type="radio"
                    label="Дом"
                    name="dealTypeId"
                    id="apartment"
                    onChange={() => onFilterChange({type: 'dealTypeId', value: 2})}
                />
                <Form.Check 
                    type="radio"
                    label="любая"
                    name="dealTypeId"
                    id="house"
                    onChange={() => onFilterChange({type: 'dealTypeId', value: null})}
                />
            </Form.Group>
        </Form>
    );
};

export default FilterComponent;