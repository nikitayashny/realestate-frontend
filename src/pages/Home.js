import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Container } from "react-bootstrap";
import { Pagination } from "antd";
import { fetchRealts } from "../http/realtAPI";
import RealtCard from "../components/RealtCard";
import FilterComponent from "../components/FilterComponent";

const Home = observer(() => {

    const { user } = useContext(Context)
    const { realt } = useContext(Context)

    // pagination //

    const PAGE_SIZE = 5

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchRealts(realt.page - 1, PAGE_SIZE)
                realt.setRealts(res.realts)
                realt.setTotalCount(res.count)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [realt.page])

    //

    return (
            <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
                <h4>Главная</h4>
                    <FilterComponent />
                    <div>
                        {realt.realts && realt.realts.map(realt => (
                            <RealtCard key={realt.id} realtItem={realt} />
                        ))}
                    </div>
                    {
                        (realt.totalCount / PAGE_SIZE) > 1 && (
                            <Pagination 
                                total={realt.totalCount}
                                pageSize={PAGE_SIZE}
                                current={realt.page}
                                onChange={(page) => realt.setPage(page)}
                            />
                        )
                    }           
            </Container> 
    )
})

export default Home;