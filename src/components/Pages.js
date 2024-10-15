import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import { Pagination } from "react-bootstrap";

const Pages = observer(() => {
    const {realt} = useContext(Context)
    const pageCount = Math.ceil(realt.totalCount / realt.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-3 mb-3">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={realt.page === page}
                    onClick={() => realt.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    )
})

export default Pages