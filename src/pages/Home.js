import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import RealtList from '../components/RealtList';
import FilterComponent from "../components/FilterComponent";

const Home = observer(() => {

  const [filters, setFilters] = useState({
    typeId: null,
    dealTypeId: null,
  });

  const handleFilterChange = (filter) => {
    const { type, value } = filter; 
    
    setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: value,
    }));

  };

  return (

    <Container>
    
        <Row>
          <Col md={3}>
            <FilterComponent onFilterChange={handleFilterChange} />
          </Col>
          <Col md={9}>
            <RealtList filters={filters}/>
          </Col>
        </Row>

    </Container>
   
  )
})

export default Home;