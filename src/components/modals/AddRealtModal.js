import React, { useContext, useState } from 'react';
import { Modal, Form, Input, Select, Button, Upload, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Context } from '../../index';
import { createRealt, fetchRealts } from '../../http/realtAPI';
import { fetchUsersRealts } from '../../http/userAPI';

const { Option } = Select;

const AddRealtModal = ({ show, onHide }) => {
    const { user } = useContext(Context);
    const { realt } = useContext(Context);
    const PAGE_SIZE = 5;

    const [fileList, setFileList] = useState([]);

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const handleSubmit = async (values) => {
        const formData = new FormData();
        const realtItem = {
            ...values,
            files: fileList.map(file => file.originFileObj),
        };

        Object.keys(realtItem).forEach(key => {
            Array.isArray(realtItem[key])
                ? realtItem[key].forEach(file => formData.append(key, file))
                : formData.append(key, realtItem[key]);
        });

        try {
            setFileList([]);
            onHide();
            const response = await createRealt(formData);
            console.log('Объявление добавлено:', response);

            fetchRealts(realt.page - 1, PAGE_SIZE, realt.selectedDealType, realt.selectedType, realt.roomsCount, realt.maxPrice, realt.sortType, realt.repair, realt.floor, realt.city, realt.minArea).then(data => {
                realt.setRealts(data.realts);
                realt.setTotalCount(data.count);
            });

            fetchUsersRealts(user.userId).then(data => {
                realt.setUsersRealts(data);
            });
        } catch (error) {
            console.error('Ошибка при добавлении объявления:', error);
        }
    };

    return (
        <Modal
            visible={show}
            onCancel={onHide}
            footer={null}
            width="80%"
            style={{ top: 0}}
        >
            <h2>Добавление нового объявления</h2>
            <Form className='mt-4' onFinish={handleSubmit} encType="multipart/form-data">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Тип недвижимости:"
                            name="type"
                            rules={[{ required: true, message: 'Выберите тип недвижимости' }]}
                        >
                            <Select placeholder="Выберите тип недвижимости">
                                <Option value="1">Квартира</Option>
                                <Option value="2">Дом</Option>
                                <Option value="3">Офис</Option>
                                <Option value="4">Гараж</Option>
                                <Option value="5">Торговое помещение</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Тип сделки:"
                            name="dealType"
                            rules={[{ required: true, message: 'Выберите тип сделки' }]}
                        >
                            <Select placeholder="Выберите тип сделки">
                                <Option value="1">Аренда</Option>
                                <Option value="2">Продажа</Option>
                                <Option value="3">Посуточно</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Наличие ремонта:"
                            name="repair"
                            rules={[{ required: true, message: 'Выберите тип ремонта' }]}
                        >
                            <Select placeholder="Выберите тип недвижимости">
                                <Option value="1">Без ремонта</Option>
                                <Option value="2">Старый ремонт</Option>
                                <Option value="3">Новый ремонт</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Этаж:"
                            name="floor"
                            rules={[{ required: true, message: 'Введите номер этажа' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Название:"
                            name="name"
                            rules={[{ required: true, message: 'Введите название' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Цена:"
                            name="price"
                            rules={[{ required: true, message: 'Введите цену' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Комнаты:"
                            name="roomsCount"
                            rules={[{ required: true, message: 'Введите количество комнат' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Страна:"
                            name="country"
                            rules={[{ required: true, message: 'Введите страну' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Город:"
                            name="city"
                            rules={[{ required: true, message: 'Введите город' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Улица:"
                            name="street"
                            rules={[{ required: true, message: 'Введите улицу' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            label="Дом:"
                            name="house"
                            rules={[{ required: true, message: 'Введите номер дома' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Площадь:"
                            name="area"
                            rules={[{ required: true, message: 'Введите площадь' }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Изображения:">
                    <Upload
                        multiple
                        fileList={fileList}
                        listType="picture-card"
                        onChange={handleUploadChange}
                        beforeUpload={() => false}
                    >
                        <UploadOutlined style={{ fontSize: '24px' }} size="large"/>
                    </Upload>
                </Form.Item>
                <Form.Item
                    label="Описание:"
                    name="article"
                >
                    <Input.TextArea rows={2} />
                </Form.Item>
                <Form.Item>
                    <Button color="default" variant="solid" htmlType="submit">Добавить объявление</Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddRealtModal;