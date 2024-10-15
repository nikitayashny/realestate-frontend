import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import RealtList from '../components/RealtList';
import FilterComponent from "../components/FilterComponent";
import Pages from "../components/Pages"

const Home = observer(() => {

  return (

    <Container>
    
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