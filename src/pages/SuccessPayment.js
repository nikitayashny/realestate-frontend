import { observer } from "mobx-react-lite";
import React from "react";
import { Result } from "antd";
import { Container } from "react-bootstrap";

const SuccessPayment = observer(() => {

  return (
    <Container className="mt-5 mb-5" style={{background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px" }}>
        <Result
        status="success"
        title="Оплата произведена успешно"
        subTitle="Спасибо за ваш платеж. Ваш заказ будет обработан в ближайшее время."
        />
    </Container>
  );
});

export default SuccessPayment;