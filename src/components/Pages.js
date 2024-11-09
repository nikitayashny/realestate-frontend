import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";

const Pages = observer(() => {
    const {realt} = useContext(Context)
    const pageCount = Math.ceil(realt.totalCount / realt.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const paginationStyle = {
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem',
    };

    const itemStyle = {
        padding: '10px 15px',
        margin: '0 5px',
        cursor: 'pointer',
        border: 'transparent',
        backgroundColor: 'white',
        transition: 'background-color 0.3s, color 0.3s',
        borderRadius: '5px',
        color: 'black',
    };

    const activeItemStyle = {
        ...itemStyle,
        backgroundColor: 'black',
        color: 'white',
    };

    return (
        
        <div style={paginationStyle}>
            {pages.map(page => (
                <div
                    key={page}
                    style={realt.page === page ? activeItemStyle : itemStyle}
                    onClick={() => realt.setPage(page)}
                >
                    {page}
                </div>
            ))}
        </div>
    )
})

export default Pages