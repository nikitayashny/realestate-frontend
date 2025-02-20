import React, { useContext, useState } from 'react';
import { Modal, Typography, Divider, Button, Select } from 'antd';
import { Context } from '../../index';
import { paymentCheckout } from '../../http/paymentAPI';

const { Title, Text } = Typography;
const { Option } = Select;

const SubscriptionModal = ({ show, onHide }) => {
    const { user } = useContext(Context);
    const [selectedMonths, setSelectedMonths] = useState(1);

    const handleSubscribe = () => {
        const params = {
            name: "subscription",
            price: 20,
            quantity: selectedMonths
        };
        paymentCheckout(params)
            .then(response => {
                const { sessionUrl } = response; 
                window.open(sessionUrl, '_blank'); 
            })
            .catch(error => {
                console.error('Ошибка оформления подписки:', error);
            });
    };
    
    return (
        <Modal
            visible={show}
            onCancel={onHide}
            footer={null}
            width="80%"
            style={{ top: 100 }}
        >
            <Title level={2} style={{ textAlign: 'center' }}>Управление подпиской</Title>
            <Divider />
            {user.subscription?.dateOfCreated && user.subscription?.quantity ? (
                <>
                    <Text style={{ fontSize: '18px' }}>
                        Наличие подписки продвигает ваши объявления в топ! Это увеличивает видимость и шансы на успех.
                    </Text>
                    <Divider />
                    <Text type="success" style={{ fontSize: '24px' }}>Подписка оформлена</Text>
                    <Divider />
                    <Text>
                        Дата окончания подписки: {(() => {
                            const dateOfCreated = user.subscription.dateOfCreated;
                            const date = new Date(Date.UTC(
                                dateOfCreated[0],    
                                dateOfCreated[1] - 1, 
                                dateOfCreated[2],       
                                dateOfCreated[3],     
                                dateOfCreated[4],    
                                dateOfCreated[5]      
                            ));
                            date.setMonth(date.getMonth() + user.subscription.quantity);
                            const options = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                timeZone: 'UTC',
                            };
                            return date.toLocaleString('ru-RU', options);
                        })()}
                    </Text>
                </>
            ) : (
                <>
                    <Text style={{ fontSize: '18px' }}>
                        Наличие подписки продвигает ваши объявления в топ! Это увеличивает видимость и шансы на успех.
                    </Text>
                    <Divider />
                        <Text strong style={{ fontSize: '18px' }}>Стоимость подписки: {selectedMonths * 20} BYN</Text>
                    <Divider />
                    <Select
                        defaultValue={selectedMonths}
                        style={{ width: '100%', marginBottom: '16px' }}
                        onChange={value => setSelectedMonths(value)}
                    >
                        <Option value={1}>1 месяц</Option>
                        <Option value={3}>3 месяца</Option>
                        <Option value={6}>6 месяцев</Option>
                        <Option value={12}>12 месяцев</Option>
                    </Select>
                    <Button onClick={handleSubscribe} type="primary">
                        Перейти к оформлению подписки
                    </Button>
                </>
            )}
        </Modal>
    );
};

export default SubscriptionModal;