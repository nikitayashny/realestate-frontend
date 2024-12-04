import React, { useContext, useState } from 'react';
import { Card, } from 'react-bootstrap';
import { Context } from '..';

const SortComponent = () => {
    const {realt} = useContext(Context)
    const [sortType, setSortType] = useState(realt.sortType)
    
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
                <p>Сортировать по</p>

                    <input type="radio" name="sortType" id="sort1" value="1" style={radioStyle}
                        onChange={() => {
                            setSortType(1);
                            realt.setSortType(1);
                        }}
                    />
                    <label style={labelStyle(sortType === 1)} htmlFor="sort1">Популярности</label>

                    <input type="radio" name="sortType" id="sort2" value="2" style={radioStyle}
                        onChange={() => {
                            setSortType(2);
                            realt.setSortType(2);
                        }}
                    />
                    <label style={labelStyle(sortType === 2)} htmlFor="sort2">Дате появления</label>     

            </Card.Body>
        </Card>
    )
}

export default SortComponent