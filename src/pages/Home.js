import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import RealtList from '../components/RealtList';
import FilterComponent from "../components/FilterComponent";
import SortComponent from "../components/SortComponent"
import Pages from "../components/Pages"
import { useContext } from "react";
import { Context } from "..";
import { fetchRealts } from "../http/realtAPI";

const Home = observer(() => {

    const {realt} = useContext(Context)

    useEffect(() => {
        fetchRealts(realt.limit, realt.page, realt.selectedType, realt.selectedDealType, realt.roomsCount, realt.maxPrice, realt.sortType, 0).then(data => {  
          realt.setRealts(data.realts)
          realt.setTotalCount(data.totalCount)
        })
    }, [realt.page, realt.selectedType, realt.selectedDealType, realt.roomsCount, realt.maxPrice, realt.sortType])

    return (
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <h4>Главная</h4>
            <FilterComponent />
            <Row>    
                <Col md={3}>
                    <SortComponent/>
                </Col>
                <Col md={9}>                 
                    <RealtList/>
                    <Pages/>
                </Col>
            </Row>

        </Container>
        </div>
    )
})

export default Home;