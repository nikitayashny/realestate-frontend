import { observer } from "mobx-react-lite";
import React from "react";
import { Result } from "antd";
import { Container } from "react-bootstrap";

const CancelPayment = observer(() => {

  return (
    <Container className="mt-5 mb-5" style={{background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px" }}>
        <Result
        status="error"
        title="Ошибка при оплате"
        subTitle="К сожалению, произошла ошибка при обработке вашего платежа. Пожалуйста, попробуйте еще раз."
        />
    </Container>
  );
});

export default CancelPayment;