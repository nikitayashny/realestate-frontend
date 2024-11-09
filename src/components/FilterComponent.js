import React, { useContext, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Context } from '..';

const FilterComponent = () => {
    const {realt} = useContext(Context)
    const [selectedDealType, setSelectedDealType] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
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
    
    return (
        <Card className="mt-3" bg='light'>
            <Card.Body>
                <Card.Title>Фильтры</Card.Title>
                <hr></hr>
                <div>
                    <p>Категория</p>

                    <input type="radio" name="dealTypeId" id="rent" value="1" style={radioStyle}
                        onChange={() => {
                            setSelectedDealType(1);
                            realt.setSelectedDealType(1);
                        }}
                    />
                    <label style={labelStyle(selectedDealType === 1)} htmlFor="rent" className='text-center'>Аренда</label>

                    <input type="radio" name="dealTypeId" id="buy" value="2" style={radioStyle}
                        onChange={() => {
                            setSelectedDealType(2);
                            realt.setSelectedDealType(2);
                        }}
                    />
                    <label style={labelStyle(selectedDealType === 2)} htmlFor="buy" className='text-center'>Покупка</label>

                    <input type="radio" name="dealTypeId" id="any" value="0" style={radioStyle}
                        onChange={() => {
                            setSelectedDealType(0);
                            realt.setSelectedDealType(0);
                        }}
                    />
                    <label style={labelStyle(selectedDealType === 0)} htmlFor="any" className='text-center'>Любая</label>
                </div>
                <hr></hr>
                <div>
                    <p>Тип недвижимости</p>

                    <input type="radio" name="typeId" id="apartment" value="1" style={radioStyle}
                        onChange={() => {
                            setSelectedType(1);
                            realt.setSelectedType(1);
                        }}
                    />
                    <label style={labelStyle(selectedType === 1)} htmlFor="apartment" className='text-center'>Квартира</label>

                    <input type="radio" name="typeId" id="house" value="2" style={radioStyle}
                        onChange={() => {
                            setSelectedType(2);
                            realt.setSelectedType(2);
                        }}
                    />
                    <label style={labelStyle(selectedType === 2)} htmlFor="house" className='text-center'>Дом</label>

                    <input type="radio" name="typeId" id="anyType" value="0" style={radioStyle}
                        onChange={() => {
                            setSelectedType(0);
                            realt.setSelectedType(0);
                        }}
                    />
                    <label style={labelStyle(selectedType === 0)} htmlFor="anyType" className='text-center'>Любой</label>
                </div>
            </Card.Body>
        </Card>
    );
};

export default FilterComponent;