import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

import { Pagination } from "antd";
import { fetchRealts } from "../http/realtAPI";

const Home = observer(() => {

    const { user } = useContext(Context)

    // pagination //

    const PAGE_SIZE = 1

    const [data, setData] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchRealts(page - 1, PAGE_SIZE)
                setData({realts: res.realts, total: res.count})
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [page])

    //

    return (
        <div>
            {user.isAuth 
            ?
            <>
                <div>{user.userName}</div>
                <div>{user.email}</div>
                <div>{user.role}</div>
            </>
            : <></>
            }

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.realts && data.realts.length > 0 && data.realts.map((realt, index) => (
                        <tr key={realt.id}>
                            <td>{(page - 1) * PAGE_SIZE + (index + 1)}</td>
                            <td>{realt.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                (data.total / PAGE_SIZE) > 1 && (
                    <Pagination 
                        total={data.total}
                        pageSize={PAGE_SIZE}
                        current={page}
                        onChange={(page) => setPage(page)}
                    />
                )
            }            
        </div>
    )
})

export default Home;