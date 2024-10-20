import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import RealtList from '../components/RealtList';
import FilterComponent from "../components/FilterComponent";
import Pages from "../components/Pages"
import { useContext } from "react";
import { Context } from "..";
import { fetchRealts } from "../http/realtAPI";

const Home = observer(() => {

  const {realt} = useContext(Context)

  useEffect(() => {
    fetchRealts(realt.limit, realt.page, realt.selectedType, realt.selectedDealType, 0).then(data => {  
      realt.setRealts(data.realts)
      realt.setTotalCount(data.totalCount)
    })
  }, [realt.page, realt.selectedType, realt.selectedDealType])

  return (
        <Container style={{ minHeight: '83.947vh'}}>

          <Row>
            <Col md={3}>
              <FilterComponent />
            </Col>
            <Col md={9}>
              <RealtList/>
              <Pages/>
            </Col>
          </Row>

        </Container>
  )
})

export default Home;