import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Container } from "react-bootstrap";
import { Pagination } from "antd";
import { fetchRealts } from "../http/realtAPI";
import RealtCard from "../components/RealtCard";

const Home = observer(() => {

    const { user } = useContext(Context)

    // pagination //

    const PAGE_SIZE = 5

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
            <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
                <h4>Главная</h4>
                {user.isAuth 
                ?
                <>
                    <div>{user.userName}</div>
                    <div>{user.email}</div>
                    <div>{user.role}</div>
                </>
                : <></>
                }

            <div>
                {data.realts && data.realts.map(realt => (
                    <RealtCard key={realt.id} realtItem={realt} />
                ))}
            </div>

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
            </Container> 
    )
})

export default Home;