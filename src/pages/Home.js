import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { Col, Container, Row } from "react-bootstrap";
import { Pagination } from "antd";
import { fetchRealts } from "../http/realtAPI";
import RealtCard from "../components/RealtCard";
import FilterComponent from "../components/FilterComponent";
import SortComponent from "../components/SortComponent";

const Home = observer(() => {

    const { user } = useContext(Context)
    const { realt } = useContext(Context)

    const PAGE_SIZE = 5

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchRealts(realt.page - 1, PAGE_SIZE, realt.selectedDealType, realt.selectedType, realt.roomsCount, realt.maxPrice, realt.sortType)
                realt.setRealts(res.realts)
                realt.setTotalCount(res.count)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [realt.page, realt.selectedDealType, realt.selectedType, realt.roomsCount, realt.maxPrice, realt.sortType])


    return (
            <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
                <h4>Главная</h4>
                    <FilterComponent />
                    <Row>
                        <Col md={3}>
                            <SortComponent/>
                        </Col>
                        <Col md={9}>
                            <div>
                                {realt.realts && realt.realts.map(realt => (
                                    <RealtCard key={realt.id} realtItem={realt} />
                                ))}
                            </div>
                            <div className="d-flex align-items-center justify-content-center mt-3">
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
                            </div>     
                        </Col>
                    </Row>   
            </Container> 
    )
})

export default Home;