import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
//import { fetchBrands, fetchTypes, fetchProducts } from "../http/productAPI";
import { fetchRealts, createRealt } from "../http/realtAPI";
import RealtList from '../components/RealtList';
import FilterComponent from "../components/FilterComponent";

const Home = observer(() => {
  const {realt} = useContext(Context)
  const {user} = useContext(Context)
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

  // useEffect(() => {
  //   fetchTypes().then(data => product.setTypes(data))
  //   fetchBrands().then(data => product.setBrands(data))
  // }, [])

  // useEffect(() => {
  //   fetchProducts(product.selectedType.id, product.selectedBrand.id, false, product.page, product.limit).then(data => {
  //     product.setProducts(data.rows)
  //     product.setTotalCount(data.count)
  //   })
  // }, [product.page, product.selectedType, product.selectedBrand])


  return (
    <Container>

        <Row className="mt-2">
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