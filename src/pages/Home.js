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

  useEffect(() => {
    fetchRealts().then(data => {  
      realt.setRealts(data)
      console.log(realt.realts)
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    const formElements = event.target.elements;

    const realt = {
        type: formElements.type.value,
        dealType: formElements.dealType.value,
        name: formElements.name.value,
        price: formElements.price.value,
        roomsCount: formElements.roomsCount.value,
        country: formElements.country.value,
        city: formElements.city.value,
        street: formElements.street.value,
        house: formElements.house.value,
        area: formElements.area.value,
        article: formElements.article.value,
    };

    Object.keys(realt).forEach(key => {
        formData.append(key, realt[key]);
    });

    formData.append("file1", formElements.file1.files[0]);
    formData.append("file2", formElements.file2.files[0]);
    formData.append("file3", formElements.file3.files[0]);

    formData.append("userId", user.userId);

    try {
        const response = await createRealt(formData);
        console.log('Объявление добавлено:', response);
    } catch (error) {
        console.error('Ошибка при добавлении объявления:', error);
    }
};

  return (
    <Container>

        <Row className="mt-2">
  
          <Col md={12}>
          {user.isAuth ?
                <div>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="type" className="form-label">Тип недвижимости:</label>
                          <select className="form-select" id="type" name="type" required>
                            <option value="" disabled selected>Выберите тип недвижимости</option>
                            <option value="1">Квартира</option>
                            <option value="2">Дом</option>
                          </select>
                        </div>
                        <div className="col">
                          <label htmlFor="dealType" className="form-label">Тип сделки:</label>
                          <select className="form-select" id="dealType" name="dealType" required>
                            <option value="" disabled selected>Выберите тип сделки</option>
                            <option value="1">Аренда</option>
                            <option value="2">Продажа</option>
                          </select>
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">Название:</label>
                        <input type="text" className="form-control form-control-sm" id="name" name="name" required />
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="price" className="form-label">Цена:</label>
                          <input type="number" className="form-control form-control-sm" id="price" name="price" required />
                        </div>
                        <div className="col">
                          <label htmlFor="roomsCount" className="form-label">Комнаты:</label>
                          <input type="number" className="form-control form-control-sm" id="roomsCount" name="roomsCount" required />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="country" className="form-label">Страна:</label>
                          <input type="text" className="form-control form-control-sm" id="country" name="country" required />
                        </div>
                        <div className="col">
                          <label htmlFor="city" className="form-label">Город:</label>
                          <input type="text" className="form-control form-control-sm" id="city" name="city" required />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="street" className="form-label">Улица:</label>
                        <input type="text" className="form-control form-control-sm" id="street" name="street" required />
                      </div>
                      <div className="row mb-3">
                        <div className="col">
                          <label htmlFor="house" className="form-label">Дом:</label>
                          <input type="number" className="form-control form-control-sm" id="house" name="house" required />
                        </div>
                        <div className="col">
                          <label htmlFor="area" className="form-label">Площадь:</label>
                          <input type="number" className="form-control form-control-sm" id="area" name="area" required />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file1" className="form-label">Фотография 1:</label>
                        <input type="file" className="form-control form-control-sm" id="file1" name="file1" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file2" className="form-label">Фотография 2:</label>
                        <input type="file" className="form-control form-control-sm" id="file2" name="file2" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="file3" className="form-label">Фотография 3:</label>
                        <input type="file" className="form-control form-control-sm" id="file3" name="file3" required/>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="article" className="form-label">Описание:</label>
                        <textarea className="form-control form-control-sm" id="article" name="article" rows="2"></textarea>
                      </div>
                      <input type="hidden" name="userId" value={user.userId} />
                      <button type="submit" className="btn btn-primary">Добавить объявление</button>
                    </form>
                </div>
                :
                <></>
            }
            <RealtList/>
          </Col>
        </Row>
    </Container>
  )
})

export default Home;