import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
//import { fetchBrands, fetchTypes, fetchProducts } from "../http/productAPI";
import { fetchRealts, createRealt } from "../http/realtAPI";
import RealtList from '../components/RealtList';

const Home = observer(() => {
  const {realt} = useContext(Context)
  const {user} = useContext(Context)

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


//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     const formElements = event.target.elements;

//     const realtItem = {
//         type: formElements.type.value,
//         dealType: formElements.dealType.value,
//         name: formElements.name.value,
//         price: formElements.price.value,
//         roomsCount: formElements.roomsCount.value,
//         country: formElements.country.value,
//         city: formElements.city.value,
//         street: formElements.street.value,
//         house: formElements.house.value,
//         area: formElements.area.value,
//         article: formElements.article.value,
//     };

//     Object.keys(realtItem).forEach(key => {
//         formData.append(key, realtItem[key]);
//     });

//     formData.append("file1", formElements.file1.files[0]);
//     formData.append("file2", formElements.file2.files[0]);
//     formData.append("file3", formElements.file3.files[0]);

//     formData.append("userId", user.userId);

//     try {
//         const response = await createRealt(formData)
//         console.log('Объявление добавлено:', response);

//         fetchRealts().then(data => {  
//           realt.setRealts(data)
//         })
        
//     } catch (error) {
//         console.error('Ошибка при добавлении объявления:', error);
//     }
// };

  return (
    <Container>

        <Row className="mt-2">
  
          {/* <Col md={12}> */}
            <RealtList/>
          {/* </Col> */}
        </Row>
    </Container>
  )
})

export default Home;